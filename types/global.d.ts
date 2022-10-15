declare module "@knovator/api"

declare module "@knovator/masters-admin" {
    const Provider: (props: ProviderContextProviderProps) => JSX.Element
    const Master: {
        (props: MasterProps): typeof Element
        Table: (props: TableWrapperProps) => JSX.Element | null
        Pagination: () => JSX.Element | null
        Search: () => JSX.Element
        AddButton: () => JSX.Element
        Form: (props: FormContainerProps) => JSX.Element | null
        Lister: (props: ListerProps) => JSX.Element | null
        FormActions: (props: FormActionWrapperProps) => JSX.Element
        FormWrapper: (props: FormWrapperProps) => JSX.Element
    }
    const SubMaster: {
        (props: SubMasterProps): typeof Element
        Table: (props: TableWrapperProps) => JSX.Element | null
        Pagination: () => JSX.Element | null
        Search: () => JSX.Element
        AddButton: () => JSX.Element
        Form: (props: FormContainerProps) => JSX.Element | null
        FormActions: (props: FormActionWrapperProps) => JSX.Element
        FormWrapper: (props: FormWrapperProps) => JSX.Element
    }
    const ImageUpload: (props: ImageUploadProps) => JSX.Element
    const Input: {
        (props: InputProps): JSX.Element
        Textarea: (props: TextareaProps) => JSX.Element
        Select: (props: SelectProps) => JSX.Element
        Checkbox: (props: CheckboxProps) => JSX.Element
    }
}

interface SubMasterProps extends React.PropsWithChildren {
    sortable?: boolean
    defaultSort?: SortConfigType
    limits?: number[]
    routes?: Routes_Input
    loader?: JSX.Element
    explicitForm?: boolean
    t?: TFunc
    permissions?: PermissionsObj
    preConfirmDelete?: (data: { row: any }) => Promise<boolean>
}

interface FormWrapperProps {
    children: (data: {
        formState: FormActionTypes | undefined
        onClose: () => void
        open: boolean
    }) => JSX.Element | null
}

interface FormActionWrapperProps {
    formRef: import("react").MutableRefObject<HTMLFormElement | null>
}

interface ListerProps {
    selectFirst?: boolean;
    render?: ({ row, onClick, masterCode }: { row: any; onClick: () => void; masterCode: string }) => JSX.Element
}

interface FormContainerProps {
    schema?: SchemaType[]
    ref: import("react").MutableRefObject<HTMLFormElement | null>
}
interface ProviderContextProviderProps
    extends React.PropsWithChildren,
        Omit<
            ProviderContextType,
            | "onError"
            | "onSuccess"
            | "selectedMaster"
            | "onLogout"
            | "setSelectedMaster"
            | "dataGetter"
            | "paginationGetter"
            | "switchClass"
        > {
    onError?: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void
    onSuccess?: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void
    onLogout?: () => void
    dataGetter?: (response: any) => any[]
    paginationGetter?: (response: any) => any
    switchClass?: string
}

interface TableWrapperProps {
    columns?: ColumnsSchema
    actions?: false | TableActionTypes
}

// Table & Pagination
type TableSchemaCellArgs = { row: any; onUpdate: (data: any) => void }
type ColumnCellType = { row: any; onUpdate: (data: any) => void }
type ColumnSchemaType = {
    Header: String | React.ReactElement | (() => any)
    accessor: string
    id?: string
    sortable?: boolean
    Cell?: (data: TableSchemaCellArgs) => any
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
    onMove?: (sourceIndex: number, destinationIndex: number) => void
    dragEnable?: boolean
    noDataText?: string
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
    pageLabel?: string
    nextLabel?: string
    previousLabel?: string
    disabledPagination?: boolean
}

type SortConfigType = [string, 1 | -1]
// \ End of Table & Pagination

// Context
interface ProviderContextType {
    baseUrl: string
    token: string | (() => Promise<string>)
    selectedMaster: any
    switchClass: string
    setSelectedMaster: (data: any) => void
    dataGetter: (response: any) => any[]
    paginationGetter: (response: any) => any
    onError: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void
    onSuccess: (callback_code: import("../src/constants/common").CALLBACK_CODES, code: string, message: string) => void
    onLogout: () => void
}
interface MasterContextType {
    t: (key: string) => string
    // Form
    formState: FormActionTypes | undefined
    closeForm: () => void
    onDataSubmit: (data: any) => void
    onChangeFormState: (status: FormActionTypes, data?: any) => void
    updateData: any
    loading: boolean
    canAdd: boolean
    canUpdate: boolean
    // Pagination
    currentPage: number
    setCurrentPage: (page: number) => void
    totalPages: number
    pageSize: number
    setPageSize: (size: number) => void
    totalRecords: number
    limits: number[]
    canList: boolean
    // Table
    sortConfig: SortConfigType
    setSortConfig: (config: SortConfigType) => void
    onUpdate: (id: string, data: any) => Promise<void>
    sortable: boolean
    columns: ColumnsSchema
    data: any[]
    loader?: JSX.Element
    canDelete?: boolean
    canPartialUpdate?: boolean
    getMastersList: (search?: string) => Promise<void>
    // Pagination
    searchStr: string
    setSearchStr: (val: string) => void
}
interface SubMasterContextType {
    t: (key: string) => string
    // Form
    formState: FormActionTypes | undefined
    closeForm: () => void
    onDataSubmit: (data: any) => void
    onChangeFormState: (status: FormActionTypes, data?: any) => void
    updateData: any
    loading: boolean
    canAdd: boolean
    canUpdate: boolean
    onImageUpload: (file: File) => Promise<{ fileUrl: string; fileId: string } | void>
    onImageRemove: (id: string) => Promise<void>
    // Pagination
    currentPage: number
    setCurrentPage: (page: number) => void
    totalPages: number
    pageSize: number
    setPageSize: (size: number) => void
    totalRecords: number
    limits: number[]
    canList: boolean
    // Table
    sortConfig: SortConfigType
    setSortConfig: (config: SortConfigType) => void
    onUpdate: (id: string, data: any) => Promise<void>
    sortable: boolean
    columns: ColumnsSchema
    data: any[]
    loader?: JSX.Element
    canDelete?: boolean
    canPartialUpdate?: boolean
    getSubMastersList: (search?: string) => Promise<void>
    onChangeSequence: (sourceIndex: number, destinationIndex: number) => Promise<void>
    sequencing: boolean
    setSequencing: (status: boolean) => void
    onConfirmSequence: () => void
    // Pagination
    searchStr: string
    setSearchStr: (val: string) => void
}
type onDelete = ({ data, confirmDelete }: { data: any; confirmDelete: () => void }) => any
// \ End of Context

// API
type ACTION_TYPES = "IMAGE_UPLOAD" | "IMAGE_REMOVE" | "CREATE" | "LIST" | "DELETE" | "UPDATE" | "SEQUENCE"

interface BaseAPIProps {
    config?: any
    baseUrl: string
    token: string | (() => Promise<string>)
    data?: any
    url: string
    method: string
    onError?: (error: Error) => void
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
    field: import("react-hook-form").ControllerRenderProps
    error?: string
    setError: (msg: string) => void
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

// Components
interface MasterProps extends React.PropsWithChildren {
    sortable?: boolean
    defaultSort?: SortConfigType
    limits?: number[]
    routes?: Routes_Input
    loader?: JSX.Element
    explicitForm?: boolean
    permissions?: PermissionsObj
    t?: (key: string) => string
    preConfirmDelete?: (data: { row: any }) => Promise<boolean>
    switchClass?: string
}
interface ImageObjectProps {
    _id: string
    uri: string
    nm: string
    type: string
}

interface ImageUploadProps {
    className?: string
    text: string | JSX.Element
    maxSize: number
    imgId?: string | ImageObjectProps
    setImgId: (value?: string | null) => void
    clearError?: () => void
    onError: (msg: string) => void
    onImageUpload: (file: File) => Promise<{ fileUrl: string; fileId: string } | void>
    onImageRemove?: (id: string) => Promise<void>
    baseUrl: string
    error?: string
}
interface InputProps {
    value?: string | number
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: "number" | "text" | "search" | "checkbox"
    rest?: any
    label?: string
    error?: string
    className?: string
    wrapperClassName?: string
    disabled?: boolean
}
interface CheckboxProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    rest?: any
    label?: string
    error?: string
    className?: string
    disabled?: boolean
}
interface SelectProps {
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    rest?: any
    label?: string
    error?: string
    options?: { value: string; label: string }[]
    className?: string
    disabled?: boolean
}
interface TextareaProps {
    value?: string | number
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    rest?: any
    label?: string
    error?: string
    disabled?: boolean
    className?: string
}
// \ End of Components

interface PermissionsObj {
    list: boolean
    sequencing: boolean
    add: boolean
    update: boolean
    partialUpdate: boolean
    destroy: boolean
}

type TFunc = (key: string) => string
