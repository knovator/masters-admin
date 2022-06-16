import { useState, useCallback, useEffect, useRef } from "react"

import { useProviderState } from "context/ProviderContext"
import usePagination from "hook/usePagination"
import request, { getApiType } from "api"
import { INTERNAL_ERROR_CODE, CALLBACK_CODES } from "constants/common"

interface UseMasterProps {
  defaultLimit: number
  routes?: Routes_Input
  defaultSort?: SortConfigType
  permissions: PermissionsObj
  preConfirmDelete?: (data: { row: any }) => Promise<boolean>
}

const useMaster = ({
  defaultLimit,
  routes,
  defaultSort = ["createdAt", 1],
  preConfirmDelete,
  permissions,
}: UseMasterProps) => {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [itemData, setItemData] = useState<any | null>(null)
  const [formState, setFormState] = useState<FormActionTypes>()

  const sortConfigRef = useRef<SortConfigType>(defaultSort)

  const { baseUrl, token, dataGetter, paginationGetter, onError, onSuccess } = useProviderState()
  const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination({ defaultLimit })

  const getMastersList = useCallback(
    async (search?: string) => {
      try {
        let sortConfig = sortConfigRef.current
        setLoading(true)
        let api = getApiType({ routes, action: "LIST", module: "masters" })
        let response = await request({
          baseUrl,
          token,
          method: api.method,
          url: api.url,
          data: {
            search,
            options: {
              sort: {
                [sortConfig[0]]: sortConfig[1],
              },
              offset: filter.offset,
              limit: filter.limit,
              page: currentPage,
              pagination: true,
            },
          },
        })
        if (response?.code === "SUCCESS") {
          onSuccess(CALLBACK_CODES.GET_ALL, response.code, response.message)
          setLoading(false)
          setTotalPages(paginationGetter(response).totalPages)
          setTotalRecords(paginationGetter(response).totalDocs)
          return setList(dataGetter(response))
        }
        setLoading(false)
        onError(CALLBACK_CODES.GET_ALL, response.code, response.message)
      } catch (error) {
        setLoading(false)
        onError(CALLBACK_CODES.GET_ALL, INTERNAL_ERROR_CODE, (error as Error).message)
      }
    },
    [currentPage, filter]
  )
  const onChangeSortConfig = (data: SortConfigType) => {
    sortConfigRef.current = data
    getMastersList()
  }
  const partialUpdate = useCallback(
    async (id: string, data: any) => {
      try {
        let api = getApiType({ routes, action: "UPDATE", module: "masters", id })
        let response = await request({
          data,
          baseUrl,
          token,
          method: api.method,
          url: api.url,
        })
        if (response?.code === "SUCCESS") {
          onSuccess(CALLBACK_CODES.UPDATE, response.code, response.message)
          getMastersList()
        } else {
          onError(CALLBACK_CODES.UPDATE, response.code, response.message)
        }
      } catch (error) {
        onError(CALLBACK_CODES.UPDATE, INTERNAL_ERROR_CODE, (error as Error).message)
      }
    },
    [getMastersList]
  )
  const onDataSubmit = async (data: any) => {
    setLoading(true)
    try {
      let api = getApiType({
        routes,
        action: formState === "ADD" ? "CREATE" : "UPDATE",
        module: "masters",
        id: itemData.id,
      })
      let response = await request({
        baseUrl,
        token,
        method: api.method,
        url: api.url,
        data,
      })
      if (response?.code === "SUCCESS") {
        setLoading(false)
        onSuccess(CALLBACK_CODES.CREATE, response?.code, response?.message)
        getMastersList()
      } else {
        setLoading(false)
        onError(CALLBACK_CODES.CREATE, response?.code, response?.message)
      }
    } catch (error) {
      setLoading(false)
      onError(CALLBACK_CODES.GET_ALL, INTERNAL_ERROR_CODE, (error as Error).message)
    }
    onCloseForm()
  }
  const onCloseForm = () => {
    setFormState(undefined)
    setItemData(null)
  }
  const onCofirmDeleteMaster = async () => {
    try {
      let proceed = true
      if (typeof preConfirmDelete === "function") {
        try {
          proceed = await preConfirmDelete({ row: itemData })
        } catch (error) {
          proceed = false
        }
      }

      if (proceed) {
        setLoading(true)
        let api = getApiType({
          routes,
          action: "DELETE",
          module: "masters",
        })
        let response = await request({
          baseUrl,
          token,
          method: api.method,
          url: api.url,
          data: {
            id: [itemData?.id],
          },
        })
        if (response?.code === "SUCCESS") {
          setLoading(false)
          onSuccess(CALLBACK_CODES.DELETE, response?.code, response?.message)
          getMastersList()
          onCloseForm()
          return
        }
        setLoading(false)
        onError(CALLBACK_CODES.DELETE, response?.code, response?.message)
        onCloseForm()
      }
    } catch (error) {
      setLoading(false)
      onError(CALLBACK_CODES.GET_ALL, INTERNAL_ERROR_CODE, (error as Error).message)
      onCloseForm()
    }
  }
  const onChangeFormState = async (state: FormActionTypes, data?: any) => {
    setItemData(data || null)
    setFormState(state)
  }

  useEffect(() => {
    getMastersList()
  }, [pageSize, currentPage])

  return {
    list,
    getMastersList,
    loading,
    setLoading,
    partialUpdate,

    // Pagination
    pageSize,
    totalPages,
    currentPage,
    totalRecords,
    setCurrentPage,
    setPageSize,

    // Sorting
    sortConfig: sortConfigRef.current,
    setSortConfig: onChangeSortConfig,

    // Form
    formState,
    itemData,
    onChangeFormState,
    onCloseForm,
    onDataSubmit,
    onCofirmDeleteMaster,
  }
}

export default useMaster
