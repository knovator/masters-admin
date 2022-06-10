declare module "@knovator/api"

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

interface MasterContextInterface {
  baseUrl: string
  permissions: any
  token: string
  dataGetter: (response: any) => any[]
  paginationGetter: (response: any) => any
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