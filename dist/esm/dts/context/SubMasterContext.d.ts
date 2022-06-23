import React from "react";
interface MasterContextProviderProps extends React.PropsWithChildren, Partial<SubMasterContextType> {
}
declare const SubMasterContextProvider: ({ t, formState, closeForm, loading, onChangeFormState, onDataSubmit, updateData, canAdd, canUpdate, onImageUpload, currentPage, limits, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords, canList, columns, data, getSubMastersList, onUpdate, setSortConfig, sortConfig, sortable, canDelete, canPartialUpdate, loader, onChangeSequence, children, }: MasterContextProviderProps) => JSX.Element;
export declare function useSubMasterState(): SubMasterContextType;
export default SubMasterContextProvider;
