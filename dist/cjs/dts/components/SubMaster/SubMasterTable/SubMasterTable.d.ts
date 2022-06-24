/// <reference types="react" />
interface MasterTableProps {
    columns?: ColumnsSchema;
    actions?: false | TableActionTypes;
}
declare const SubMasterTable: ({ columns, actions }: MasterTableProps) => JSX.Element | null;
export default SubMasterTable;
