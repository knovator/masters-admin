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
  loading?: boolean
  loader?: JSX.Element 
  columns: ColumnsSchema
  sequencing?: boolean
  sortable?: boolean
  sortConfig?: SortConfigType
  setSortConfig?: (data: SortConfigType) => void
}

interface TableActionTypes {
  showUpdate?: boolean
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
  token: string
  dataGetter: (response: any) => any[]
  paginationGetter: (response: any) => any
  onError: (callback_code: import("constants/common").CALLBACK_CODES, code: string, message: string) => void
  onSuccess: (callback_code: import("constants/common").CALLBACK_CODES, code: string, message: string) => void
}
interface MasterContextType {
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
  canList?: boolean
}
interface TableContextType {
  sortConfig: SortConfigType
  setSortConfig: (config: SortConfigType) => void
  onUpdate: (id: string, data: any) => Promise<void>
  sortable: boolean
  columns: ColumnsSchema
  data: any[]
  loader?: JSX.Element
  loading?: boolean
  onChangeFormState: (status: FormActionTypes, data?: any) => void
  canList?: boolean
  canUpdate?: boolean
  canDelete?: boolean
  canPartialUpdate?: boolean
}
interface FormContextType {
  formState: FormActionTypes | undefined
  closeForm: () => void
  onDataSubmit: (data: any) => void
  onChangeFormState: (status: FormActionTypes, data?: any) => void
  updateData: any
  loading: boolean
  canAdd?: boolean
  canUpdate?: boolean
}
type onDelete = ({ data, confirmDelete }: { data: any; confirmDelete: () => void }) => any
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
  editable?: boolean
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: "text" | "number" | "select" | "checkbox" | "textarea"
  options?: { value: string; label: string }[]
  defaultValue?: string | number | boolean
  placeholder?: string
}
type FormActionTypes = "ADD" | "UPDATE" | "DELETE" | null | ""
// \ End of Form

interface PermissionsObj {
  list: boolean
  sequencing: boolean
  add: boolean
  update: boolean
  partialUpdate: boolean
  destroy: boolean
}