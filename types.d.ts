declare module '@knovator/api';
declare module '@knovator/can';

type SchemaType = {
  Header: String | ((props: any) => any)
  accessor: string
  id?: string
  Cell?: ({ row }: { row: any; onUpdate: (data: any) => void }) => any
}[]

interface TableProps {
  data: any
  columns: SchemaType
  sequencing?: boolean
  sortable?: boolean
  defaultSort?: {
    [key: string]: string
  }
}

interface TableActionTypes {
  showEdit?: boolean
  showDelete?: boolean
}