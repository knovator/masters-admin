/// <reference types="react" />
interface MasterTableProps {
    columns?: ColumnsSchema;
    actions?: false | TableActionTypes;
}
declare const MasterTable: ({ columns, actions }: MasterTableProps) => JSX.Element | null;
export default MasterTable;
