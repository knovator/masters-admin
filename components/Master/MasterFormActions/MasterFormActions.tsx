import { MutableRefObject } from "react"
import { FormActions } from "components/Common"
import { useFormState } from "context/FormContext"

interface MasterFormActionProps {
  addNew?: boolean
  onPrimaryButtonClick?: () => void

  formRef: MutableRefObject<HTMLFormElement | null>
}

const MasterFormActions = ({ formRef }: MasterFormActionProps) => {
  const { formState, closeForm, loading } = useFormState()
  return (
    <FormActions
      loading={loading}
      primaryLabel={formState === "ADD" ? "Add Master" : "Edit Master"}
      onPrimaryButtonClick={() =>
        formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
      }
      onSecondaryButtonClick={closeForm}
    />
  )
}

export default MasterFormActions
