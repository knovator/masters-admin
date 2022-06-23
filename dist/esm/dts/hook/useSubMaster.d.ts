/// <reference types="react" />
interface UseMasterProps {
    defaultLimit: number;
    routes?: Routes_Input;
    defaultSort?: SortConfigType;
    preConfirmDelete?: (data: {
        row: any;
    }) => Promise<boolean>;
}
declare const useMaster: ({ defaultLimit, routes, defaultSort, preConfirmDelete }: UseMasterProps) => {
    list: any[];
    getSubMastersList: (search?: string) => Promise<void>;
    loading: boolean;
    setLoading: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    partialUpdate: (id: string, data: any) => Promise<void>;
    onChangeSequence: (id: string, seq: number) => Promise<void>;
    pageSize: number;
    totalPages: number;
    currentPage: number;
    totalRecords: number;
    setCurrentPage: (value: number) => void;
    setPageSize: (value: number) => void;
    sortConfig: SortConfigType;
    setSortConfig: (data: SortConfigType) => void;
    formState: FormActionTypes | undefined;
    itemData: any;
    onChangeFormState: (state: FormActionTypes, data?: any) => Promise<void>;
    onCloseForm: () => void;
    onDataSubmit: (data: any) => Promise<void>;
    onCofirmDeleteMaster: () => Promise<void>;
    onImageUpload: (file: File) => Promise<{
        fileUrl: string;
        fileId: string;
    }>;
};
export default useMaster;
