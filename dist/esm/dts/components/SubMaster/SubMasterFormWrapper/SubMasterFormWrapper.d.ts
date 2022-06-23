/// <reference types="react" />
interface MasterFormWrapperProps {
    children: (data: {
        formState: FormActionTypes | undefined;
        onClose: () => void;
        open: boolean;
    }) => JSX.Element | null;
}
declare const SubMasterFormWrapper: ({ children }: MasterFormWrapperProps) => JSX.Element | null;
export default SubMasterFormWrapper;
