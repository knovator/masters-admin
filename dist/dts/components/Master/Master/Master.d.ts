/// <reference types="react" />
import Lister from "../Lister";
import AddButton from "../AddButton";
import MasterForm from "../MasterForm";
import MasterTable from "../MasterTable";
import MasterFormActions from "../MasterFormActions";
import MasterFormWrapper from "../MasterFormWrapper";
import MasterPagination from "../MasterPagination";
import MasterSearch from "../MasterSearch";
declare const _default: (({ sortable, defaultSort, routes, limits, explicitForm, children, preConfirmDelete, loader, t, permissions, }: MasterProps) => JSX.Element) & {
    Table: typeof MasterTable;
    Pagination: typeof MasterPagination;
    Search: typeof MasterSearch;
    AddButton: typeof AddButton;
    Form: typeof MasterForm;
    Lister: typeof Lister;
    FormActions: typeof MasterFormActions;
    FormWrapper: typeof MasterFormWrapper;
};
export default _default;
