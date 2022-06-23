import { useMasterState } from "../../../context/MasterContext"

interface MasterFormWrapperProps {
    children: (data: {
        formState: FormActionTypes | undefined
        onClose: () => void
        open: boolean
    }) => JSX.Element | null
}
const MasterFormWrapper = ({ children }: MasterFormWrapperProps) => {
    const { formState, closeForm } = useMasterState()

    return typeof children === "function"
        ? children({ formState, onClose: closeForm, open: formState === "ADD" || formState === "UPDATE" })
        : null
}

export default MasterFormWrapper
