import { MutableRefObject } from "react";
interface MasterFormActionProps {
    formRef: MutableRefObject<HTMLFormElement | null>;
}
declare const MasterFormActions: ({ formRef }: MasterFormActionProps) => JSX.Element | null;
export default MasterFormActions;
