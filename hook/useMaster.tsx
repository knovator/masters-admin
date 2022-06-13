import { useState, useCallback, useEffect, useRef } from "react"

import { useProviderState } from "context"
import usePagination from "hook/usePagination"
import request, { getApiType } from "api"

interface UseMasterProps {
  defaultLimit: number
  routes?: Routes_Input
  defaultSort?: SortConfigType
}

const useMaster = ({ defaultLimit, routes, defaultSort = ["createdAt", 1] }: UseMasterProps) => {
  const [list, setList] = useState<any>([])
  const [loader, setLoader] = useState(false)
  const [editData, setEditData] = useState({})
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const sortConfigRef = useRef<SortConfigType>(defaultSort)

  const { baseUrl, token, dataGetter, paginationGetter } = useProviderState()
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
          setLoader(false)
          setTotalPages(paginationGetter(response).totalPages)
          setTotalRecords(paginationGetter(response).totalDocs)
          return setList(dataGetter(response))
        }
        setLoader(false)
        if (response?.message === "UNAUTHENTICATED") {
          console.log("UNAUTHORIZED")
        }
      } catch (error) {
        setLoader(false)
        console.log(error)
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
          getMastersList()
        } else {
          // showNotification(response?.message, "error")
        }
      } catch (error) {
        console.log(error)
      }
    },
    [getMastersList]
  )

  useEffect(() => {
    getMastersList()
  }, [pageSize, currentPage])

  return {
    list,
    editData,
    setEditData,
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
  }
}

export default useMaster
