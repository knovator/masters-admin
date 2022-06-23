/// <reference types="react" />
interface ListerProps {
    render?: ({ row, onClick, masterCode }: {
        row: any;
        onClick: () => void;
        masterCode: string;
    }) => JSX.Element;
}
declare const Lister: ({ render }: ListerProps) => JSX.Element | null;
export default Lister;
