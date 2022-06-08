import { useState } from "react"
import * as constants from "constants/common"
// import useDebounceValue from "hook/common/useDebounceValue";

const usePagination = () => {
  const defaultApiPayload = {
    search: "",
    offset: constants.DEFAULT_OFFSET_PAYLOAD,
    limit: constants.DEFAULT_LIMIT,
    sort: constants.DEFAULT_SORT,
  }

  const [filter, setFilter] = useState(defaultApiPayload)
  const [crtPage, setCrtPage] = useState(constants.DEFAULT_CURRENT_PAGE)

  const clickPreviousPage = (page: number) => {
    setFilter((draft) => {
      draft.offset = draft.limit * (page - 2)
      return draft
    })
    setCrtPage(page - 1)
  }

  const clickNextPage = (page: number) => {
    setFilter((draft) => {
      draft.offset = draft.limit * page
      return draft
    })
    setCrtPage(page + 1)
  }

  const pageSizeChange = (value: string) => {
    setFilter((draft) => {
      draft.limit = Number.parseInt(value, constants.DECIMAL_REDIX)
      draft.offset = constants.DEFAULT_OFFSET_PAYLOAD
      return draft
    })
    setCrtPage(constants.DEFAULT_CURRENT_PAGE)
  }

  const changeSearch = (value: string) => {
    // delay.debounced(value);
  }

  return {
    pageSizeChange,
    crtPage,
    clickNextPage,
    clickPreviousPage,
    changeSearch,
    filter,
    setCrtPage,
    defaultApiPayload,
    setFilter,
  }
}

export default usePagination
