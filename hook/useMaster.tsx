import { useState, useCallback, useEffect } from "react"

import commonApi from "api"
import { useMasterState } from "context"
import usePagination from "hook/usePagination"

const useMaster = () => {
  const [page, setPage] = useState()
  const [list, setList] = useState<any>([])
  const [loader, setLoader] = useState(false)
  const [editData, setEditData] = useState({})
  const [totalPages, setTotalPages] = useState()

  const { baseUrl, token, dataGetter, paginationGetter } = useMasterState()
  const { pageSizeChange, clickNextPage, clickPreviousPage, crtPage } = usePagination()

  const getMastersList = useCallback(async (search?: string) => {
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
              createdAt: 1,
            },
            offset: 0, // filters.offset
            limit: 20, // filters.limit
            page: crtPage,
            pagination: true,
          },
          isCountOnly: false,
        },
        action: "list",
      })
      if (response?.code === "SUCCESS") {
        setLoader(false)
        setTotalPages(paginationGetter(response).totalPages)
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
  }, [])

  useEffect(() => {
    getMastersList()
  }, [])

  return {
    list,
    editData,
    setEditData,
    getMastersList,
    setPage,
    page,
    totalPages,
    loader,
    pageSizeChange,
    clickNextPage,
    clickPreviousPage,
    crtPage,
  }
}

export default useMaster
