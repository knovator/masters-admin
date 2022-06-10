import { useState, useCallback, useEffect, useRef } from "react"

import commonApi from "api"
import { useProviderState } from "context"
import usePagination from "hook/usePagination"

interface UseMasterProps {
  defaultLimit: number
}

const useMaster = ({ defaultLimit }: UseMasterProps) => {
  const [list, setList] = useState<any>([])
  const [loader, setLoader] = useState(false)
  const [editData, setEditData] = useState({})
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const sortConfigRef = useRef<SortConfigType>(["createdAt", 1])

  const { baseUrl, token, dataGetter, paginationGetter } = useProviderState()
  const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination({ defaultLimit })

  const getMastersList = useCallback(
    async (search?: string) => {
      try {
        let sortConfig = sortConfigRef.current
        setLoader(true)
        let response = await commonApi({
          baseUrl,
          token,
          module: "masters",
          common: true,
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
          action: "list",
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
        console.log("UNAUTHORIZED")
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
      await commonApi({
        parameter: id,
        module: "masters",
        data,
        baseUrl,
        token,
        common: true,
        action: "partialUpdate",
      }).then((response) => {
        if (response?.code === "SUCCESS") {
          getMastersList()
        } else {
          // showNotification(response?.message, "error")
        }
      })
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
