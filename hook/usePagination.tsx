import { useState } from "react"
import * as constants from "constants/common"

interface UsePaginationProps {
  defaultLimit?: number
}

const usePagination = ({ defaultLimit }: UsePaginationProps) => {
  const defaultApiPayload = {
    search: "",
    offset: constants.DEFAULT_OFFSET_PAYLOAD,
    limit: defaultLimit || constants.DEFAULT_LIMIT,
    sort: constants.DEFAULT_SORT,
  }

  const [filter, setFilter] = useState(defaultApiPayload)
  const [currentPage, setCurrentPage] = useState(constants.DEFAULT_CURRENT_PAGE)

  const setPageSize = (value: number) => {
    setFilter({
      ...filter,
      limit: Number.parseInt(String(value), constants.DECIMAL_REDIX),
      offset: constants.DEFAULT_OFFSET_PAYLOAD,
    })
    setCurrentPage(constants.DEFAULT_CURRENT_PAGE)
  }

  const changeSearch = (value: string) => {
    setFilter((draft) => {
      draft.search = value
      return draft
    })
  }

  return {
    pageSize: filter.limit,
    setPageSize,
    currentPage,
    changeSearch,
    filter,
    setCurrentPage,
    defaultApiPayload,
    setFilter,
  }
}

export default usePagination
