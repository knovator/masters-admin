declare module "@knovator/api"

// Table & Pagination
type ColumnCellType = { row: any; onUpdate: (data: any) => void }
type ColumnSchemaType = {
  Header: String | React.ReactElement | (() => any)
  accessor: string
  id?: string
  sortable?: boolean
  Cell?: (data: { row: any; onUpdate: (data: any) => void }) => any
}
type ColumnsSchema = ColumnSchemaType[]

interface TableProps {
  data: any
  columns: ColumnsSchema
  sequencing?: boolean
  sortable?: boolean
  sortConfig?: SortConfigType
  setSortConfig?: (data: SortConfigType) => void
}

interface TableActionTypes {
  showEdit?: boolean
  showDelete?: boolean
  atFirst?: boolean
}

interface TableRendererProps {
  columns: ColumnsSchema
  data: any[]
}

interface PaginationRendererProps {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
  totalRecords: number
  setPageSize: (size: number) => void
}

interface PaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
  pageSize: number
  setPageSize: (size: number) => void
  totalRecords: number
  limits: number[]
}

type SortConfigType = [string, 1 | -1]
// \ End of Table & Pagination

// Context
interface ProviderContextType {
  baseUrl: string
  permissions: any
  token: string
  dataGetter: (response: any) => any[]
  paginationGetter: (response: any) => any
}
interface MasterContextType {
  onUpdate: (id: string, data: any) => Promise<void>
  limits: number[]
  sortConfig: SortConfigType
  setSortConfig: (config: SortConfigType) => void
  sortable: boolean

  // Table
  columns: ColumnsSchema
  data: any[]

  // Pagination
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
  setPageSize: (size: number) => void
  totalRecords: number
}
// \ End of Context

// API
type ACTION_TYPES = "IMAGE_UPLOAD" | "CREATE" | "LIST" | "DELETE" | "UPDATE"

interface BaseAPIProps {
  config?: any
  baseUrl: string
  token: string
  data?: any
  url: string
  method: string
}

type API_TYPE = {
  url: string
  method: string
}

type API_INPUT_TYPE = { module: string; id?: string }

type Routes_Input = Record<ACTION_TYPES, (data: API_INPUT_TYPE) => API_TYPE>
// type Routes_Input = {
//   [keyof<ACTION_TYPES>]: (data: API_INPUT_TYPE) => API_TYPE
// }
// type Routes_Input = Map<ACTION_TYPES, (data: API_INPUT_TYPE) => API_TYPE>();
// \ End of API