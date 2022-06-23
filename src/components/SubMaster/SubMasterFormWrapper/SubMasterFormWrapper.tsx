import { useSubMasterState } from "../../../context/SubMasterContext"

interface MasterFormWrapperProps {
    children: (data: {
        formState: FormActionTypes | undefined
        onClose: () => void
        open: boolean
    }) => JSX.Element | null
}
const SubMasterFormWrapper = ({ children }: MasterFormWrapperProps) => {
    const { formState, closeForm } = useSubMasterState()

    return typeof children === "function"
        ? children({ formState, onClose: closeForm, open: formState === "ADD" || formState === "UPDATE" })
        : null
}

export default SubMasterFormWrapper
