import { useState, useCallback, useEffect } from "react"

import commonApi from "api"
import { useMasterState } from "context"
import usePagination from "hook/usePagination"

const useMaster = () => {
  const [list, setList] = useState<any>([])
  const [loader, setLoader] = useState(false)
  const [editData, setEditData] = useState({})
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)

  const { baseUrl, token, dataGetter, paginationGetter } = useMasterState()
  const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination()

  const getMastersList = useCallback(
    async (search?: string) => {
      try {
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
                createdAt: 0,
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
    [baseUrl, currentPage, dataGetter, paginationGetter, token, filter]
  )

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
    [baseUrl, getMastersList, token]
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

    pageSize,
    totalPages,
    currentPage,
    totalRecords,
    setCurrentPage,
    setPageSize,
  }
}

export default useMaster
