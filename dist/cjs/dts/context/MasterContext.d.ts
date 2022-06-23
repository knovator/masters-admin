import React from "react";
interface MasterContextProviderProps extends React.PropsWithChildren, Partial<MasterContextType> {
}
declare const MasterContextProvider: ({ t, formState, closeForm, loading, onChangeFormState, onDataSubmit, updateData, canAdd, canUpdate, currentPage, limits, pageSize, setCurrentPage, setPageSize, totalPages, totalRecords, canList, columns, data, getMastersList, onUpdate, setSortConfig, sortConfig, sortable, canDelete, canPartialUpdate, loader, children, }: MasterContextProviderProps) => JSX.Element;
export declare function useMasterState(): MasterContextType;
export default MasterContextProvider;
