const DEFAULT_OFFSET_PAYLOAD = 0
const DEFAULT_LIMIT = 20
const SORT_ASCENDING = 1
const SORT_DESCENDING = -1
const PAGE_LIMITS = [10, 20, 30, 40, 50]
const DECIMAL_REDIX = 10
const DEFAULT_CURRENT_PAGE = 1
const EXCLUDE_SORT_COLUMNS = ["actions"]
const INTERNAL_ERROR_CODE = "INTERNAL_ERROR"

enum CALLBACK_CODES {
  "GET_ALL" = "GET_ALL",
  "GET_SINGLE" = "GET_SINGLE",
  "CREATE" = "CREATE",
  "UPDATE" = "UPDATE",
  "DELETE" = "DELETE",
}

const DEFAULT_PERMISSIONS = {
  list: true,
  add: true,
  destroy: true,
  partialUpdate: true,
  sequencing: false,
  update: true,
}

export {
  CALLBACK_CODES,
  DECIMAL_REDIX,
  DEFAULT_CURRENT_PAGE,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET_PAYLOAD,
  EXCLUDE_SORT_COLUMNS,
  INTERNAL_ERROR_CODE,
  PAGE_LIMITS,
  SORT_ASCENDING,
  SORT_DESCENDING,
  DEFAULT_PERMISSIONS,
}
