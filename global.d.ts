declare module "@knovator/api";
// declare module "@knovator/masters" {
// Table & Pagination
type ColumnCellType = { row: any; onUpdate: (data: any) => void };
type ColumnSchemaType = {
  Header: String | React.ReactElement | (() => any);
  accessor: string;
  id?: string;
  sortable?: boolean;
  Cell?: (data: { row: any; onUpdate: (data: any) => void }) => any;
};
type ColumnsSchema = ColumnSchemaType[];

interface TableProps {
  data: any;
  loading?: boolean;
  loader?: JSX.Element;
  columns: ColumnsSchema;
  sequencing?: boolean;
  sortable?: boolean;
  sortConfig?: SortConfigType;
  setSortConfig?: (data: SortConfigType) => void;
  onMove?: (id: string, seq: number) => void;
}

interface TableActionTypes {
  showUpdate?: boolean;
  showDelete?: boolean;
  atFirst?: boolean;
}

interface TableRendererProps {
  columns: ColumnsSchema;
  data: any[];
}

interface PaginationRendererProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  setPageSize: (size: number) => void;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRecords: number;
  limits: number[];
  pageLabel?: string;
  nextLabel?: string;
  previousLabel?: string;
}

type SortConfigType = [string, 1 | -1];
// \ End of Table & Pagination

// Context
interface ProviderContextType {
    baseUrl: string
    token: string
    masterCode: string
    setMasterCode: (code: string) => void
    dataGetter: (response: any) => any[]
    paginationGetter: (response: any) => any
    onError: (callback_code: import("./src/constants/common").CALLBACK_CODES, code: string, message: string) => void
    onSuccess: (callback_code: import("./src/constants/common").CALLBACK_CODES, code: string, message: string) => void
    onLogout?: () => void
}
interface MasterContextType {
  t: (key: string) => string;
  // Form
  formState: FormActionTypes | undefined;
  closeForm: () => void;
  onDataSubmit: (data: any) => void;
  onChangeFormState: (status: FormActionTypes, data?: any) => void;
  updateData: any;
  loading: boolean;
  canAdd: boolean;
  canUpdate: boolean;
  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRecords: number;
  limits: number[];
  canList: boolean;
  // Table
  sortConfig: SortConfigType;
  setSortConfig: (config: SortConfigType) => void;
  onUpdate: (id: string, data: any) => Promise<void>;
  sortable: boolean;
  columns: ColumnsSchema;
  data: any[];
  loader?: JSX.Element;
  canDelete?: boolean;
  canPartialUpdate?: boolean;
  getMastersList: (search?: string) => Promise<void>;
}
interface SubMasterContextType {
  t: (key: string) => string;
  // Form
  formState: FormActionTypes | undefined;
  closeForm: () => void;
  onDataSubmit: (data: any) => void;
  onChangeFormState: (status: FormActionTypes, data?: any) => void;
  updateData: any;
  loading: boolean;
  canAdd: boolean;
  canUpdate: boolean;
  onImageUpload: (file: File) => Promise<{ fileUrl: string; fileId: string }>;
  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRecords: number;
  limits: number[];
  canList: boolean;
  // Table
  sortConfig: SortConfigType;
  setSortConfig: (config: SortConfigType) => void;
  onUpdate: (id: string, data: any) => Promise<void>;
  sortable: boolean;
  columns: ColumnsSchema;
  data: any[];
  loader?: JSX.Element;
  canDelete?: boolean;
  canPartialUpdate?: boolean;
  getSubMastersList: (search?: string) => Promise<void>;
  onChangeSequence: (id: string, seq: number) => Promise<void>;
}
type onDelete = ({
  data,
  confirmDelete,
}: {
  data: any;
  confirmDelete: () => void;
}) => any;
// \ End of Context

// API
type ACTION_TYPES =
  | "IMAGE_UPLOAD"
  | "CREATE"
  | "LIST"
  | "DELETE"
  | "UPDATE"
  | "SEQUENCE";

interface BaseAPIProps {
  config?: any;
  baseUrl: string;
  token: string;
  data?: any;
  url: string;
  method: string;
  onError?: (error: Error) => void;
}

type API_TYPE = {
  url: string;
  method: string;
};

type API_INPUT_TYPE = { module: string; id?: string };

type Routes_Input = {
  [K in ACTION_TYPES]?: (data: API_INPUT_TYPE) => API_TYPE;
};
// \ End of API

// Form
interface InputRendererProps {
  field: import("react-hook-form").ControllerRenderProps;
  error?: string;
  setError: (msg: string) => void;
}

interface SchemaType {
  label?: string;
  accessor: string;
  Input?: (props: InputRendererProps) => JSX.Element;
  validations?: import("react-hook-form").RegisterOptions;
  editable?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "select" | "checkbox" | "textarea";
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
  placeholder?: string;
}
type FormActionTypes = "ADD" | "UPDATE" | "DELETE" | null | "";
// \ End of Form

// Components
interface MasterProps extends React.PropsWithChildren {
  sortable?: boolean;
  defaultSort?: SortConfigType;
  limits?: number[];
  routes?: Routes_Input;
  loader?: JSX.Element;
  explicitForm?: boolean;
  permissions?: PermissionsObj;
  t?: (key: string) => string;
  preConfirmDelete?: (data: { row: any }) => Promise<boolean>;
}
// \ End of Components

interface PermissionsObj {
  list: boolean;
  sequencing: boolean;
  add: boolean;
  update: boolean;
  partialUpdate: boolean;
  destroy: boolean;
}

type TFunc = (key: string) => string;
// }
