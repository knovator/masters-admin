import { MutableRefObject } from "react";
interface SubMasterFormActionProps {
    formRef: MutableRefObject<HTMLFormElement | null>;
}
declare const SubMasterFormActions: ({ formRef }: SubMasterFormActionProps) => JSX.Element | null;
export default SubMasterFormActions;
