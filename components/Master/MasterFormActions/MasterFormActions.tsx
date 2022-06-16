import { MutableRefObject } from "react"
import { FormActions } from "components/Common"
import { useFormState } from "context/FormContext"

interface MasterFormActionProps {
  formRef: MutableRefObject<HTMLFormElement | null>
}

const MasterFormActions = ({ formRef }: MasterFormActionProps) => {
  const { formState, closeForm, loading } = useFormState()
  const onSubmitClick = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!formRef.current) e?.preventDefault()
    else formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
  }
  return (
    <FormActions
      loading={loading}
      primaryLabel={formState === "ADD" ? "Add Master" : "Edit Master"}
      onPrimaryButtonClick={onSubmitClick}
      onSecondaryButtonClick={closeForm}
    />
  )
}

export default MasterFormActions
