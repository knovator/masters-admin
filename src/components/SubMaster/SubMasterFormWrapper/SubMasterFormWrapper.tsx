import { useSubMasterState } from "../../../context/SubMasterContext"

const SubMasterFormWrapper = ({ children }: FormWrapperProps) => {
    const { formState, closeForm } = useSubMasterState()

    return typeof children === "function"
        ? children({ formState, onClose: closeForm, open: formState === "ADD" || formState === "UPDATE" })
        : null
}

export default SubMasterFormWrapper
