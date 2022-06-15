import { useState, useCallback, useEffect, useRef } from "react"

import { useProviderState } from "context"
import usePagination from "hook/usePagination"
import request, { getApiType } from "api"
import { INTERNAL_ERROR_CODE } from "constants/common"

interface UseMasterProps {
  defaultLimit: number
  routes?: Routes_Input
  defaultSort?: SortConfigType
}

const useMaster = ({ defaultLimit, routes, defaultSort = ["createdAt", 1] }: UseMasterProps) => {
  const [list, setList] = useState<any>([])
  const [loader, setLoader] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [addNew, setAddNew] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)
  const sortConfigRef = useRef<SortConfigType>(defaultSort)

  const { baseUrl, token, dataGetter, paginationGetter, onError, onSuccess } = useProviderState()
  const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination({ defaultLimit })

  const getMastersList = useCallback(
    async (search?: string) => {
      try {
        let sortConfig = sortConfigRef.current
        setLoader(true)
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
          onSuccess(response.code, response.message)
          setLoader(false)
          setTotalPages(paginationGetter(response).totalPages)
          setTotalRecords(paginationGetter(response).totalDocs)
          return setList(dataGetter(response))
        }
        setLoader(false)
        if (response?.message === "UNAUTHENTICATED") {
          onError(response.code, response.message)
        }
      } catch (error) {
        setLoader(false)
        onError(INTERNAL_ERROR_CODE, (error as Error).message)
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
          onSuccess(response.code, response.message)
          getMastersList()
        } else {
          onError(response.code, response.message)
        }
      } catch (error) {
        onError(INTERNAL_ERROR_CODE, (error as Error).message)
      }
    },
    [getMastersList]
  )
  const onDataSubmit = (data: any) => {
    if (addNew) console.log("Adding ", data)
    else console.log("Editing ", data)
  }
  const onCloseForm = () => {
    setAddNew(false)
  }

  useEffect(() => {
    getMastersList()
  }, [pageSize, currentPage])

  return {
    list,
    getMastersList,
    loader,
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

    // Add
    addNew,
    setAddNew,
    onCloseForm,
    onDataSubmit,
  }
}

export default useMaster
