declare module "@knovator/api"

// Ref

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
  onError: (code: string, message: string) => void
  onSuccess: (code: string, message: string) => void
}
interface MasterContextType {
  // Search
  getMastersList: (search?: string) => Promise<void>
}
interface SearchContextType {
  searchOnEnter: boolean
}
interface PaginationContextType {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  pageSize: number
  setPageSize: (size: number) => void
  totalRecords: number
  limits: number[]
}
interface TableContextType {
  sortConfig: SortConfigType
  setSortConfig: (config: SortConfigType) => void
  onUpdate: (id: string, data: any) => Promise<void>
  sortable: boolean
  columns: ColumnsSchema
  data: any[]
}
interface FormContextType {
  addNew: boolean
  closeForm: () => void
  onDataSubmit: (data: any) => void
  setAddNew: (status: boolean) => void
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

type Routes_Input = {
  [K in ACTION_TYPES]?: (data: API_INPUT_TYPE) => API_TYPE
}
// \ End of API

// Form
interface InputRendererProps {
  field: any
  error?: string
}

interface SchemaType {
  label?: string
  accessor: string
  Input?: (props: InputRendererProps) => JSX.Element
  validations?: import("react-hook-form").RegisterOptions
  onlyEditable?: boolean
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: "text" | "number" | "select" | "checkbox" | "textarea"
  options?: { value: string; label: string }[]
}

// \ End of Form
