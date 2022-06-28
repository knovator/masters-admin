import { useMasterState } from "../../../context/MasterContext"

const MasterFormWrapper = ({ children }: FormWrapperProps) => {
    const { formState, closeForm } = useMasterState()

    return typeof children === "function"
        ? children({ formState, onClose: closeForm, open: formState === "ADD" || formState === "UPDATE" })
        : null
}

export default MasterFormWrapper
