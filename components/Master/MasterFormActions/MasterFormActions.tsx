import { MutableRefObject } from "react"
import { FormActions } from "components/Common"
import { useFormState } from "context/FormContext"

interface MasterFormActionProps {
  addNew?: boolean
  onPrimaryButtonClick?: () => void

  formRef: MutableRefObject<HTMLFormElement | null>
}

const MasterFormActions = ({ formRef }: MasterFormActionProps) => {
  const { addNew, closeForm } = useFormState()
  return (
    <FormActions
      primaryLabel={addNew ? "Add Master" : "Edit Master"}
      onPrimaryButtonClick={() =>
        formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
      }
      onSecondaryButtonClick={closeForm}
    />
  )
}

export default MasterFormActions
