import { useFormState } from "context/FormContext"

interface MasterFormWrapperProps {
  children: (data: { formState: FormActionTypes | undefined; onClose: () => void; open: boolean }) => JSX.Element | null
}
const MasterFormWrapper = ({ children }: MasterFormWrapperProps) => {
  const { formState, closeForm } = useFormState()
  if (typeof children !== "function")
    throw new Error("Children should be passed as function, i.e. {({ formState, closeForm, open }) => {...}}")

  return children({ formState, onClose: closeForm, open: formState === "ADD" || formState === "UPDATE" })
}

export default MasterFormWrapper
