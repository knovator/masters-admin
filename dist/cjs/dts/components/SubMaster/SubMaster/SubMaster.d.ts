import React from "react";
import AddButton from "../AddButton";
import SubMasterForm from "../SubMasterForm";
import SubMasterTable from "../SubMasterTable";
import SubMasterSearch from "../SubMasterSearch";
import SubMasterPagination from "../SubMasterPagination";
import SubMasterFormWrapper from "../SubMasterFormWrapper";
import SubMasterFormActions from "../SubMasterFormActions";
interface SubMasterProps extends React.PropsWithChildren {
    sortable?: boolean;
    defaultSort?: SortConfigType;
    limits?: number[];
    routes?: Routes_Input;
    loader?: JSX.Element;
    explicitForm?: boolean;
    t?: TFunc;
    permissions?: PermissionsObj;
    preConfirmDelete?: (data: {
        row: any;
    }) => Promise<boolean>;
}
declare const _default: (({ sortable, defaultSort, routes, limits, preConfirmDelete, loader, children, permissions, explicitForm, t, }: SubMasterProps) => JSX.Element) & {
    Table: typeof SubMasterTable;
    Search: typeof SubMasterSearch;
    Pagination: typeof SubMasterPagination;
    AddButton: typeof AddButton;
    Form: typeof SubMasterForm;
    Actions: typeof SubMasterFormActions;
    FormWrapper: typeof SubMasterFormWrapper;
};
export default _default;
