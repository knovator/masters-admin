import { FormActions } from "components/Common"
import { useMasterState } from "context/MasterContext"
import { MutableRefObject } from "react"

interface MasterFormActionProps {
  formRef: MutableRefObject<HTMLFormElement | null>
  addLabel?: string
  editLabel?: string
}

const MasterFormActions = ({ formRef, addLabel = "Add Master", editLabel = "Edit Master" }: MasterFormActionProps) => {
  const { formState, closeForm, loading, canAdd, canUpdate } = useMasterState()
  const onSubmitClick = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!formRef.current) e?.preventDefault()
    else formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
  }

  if (!canAdd && !canUpdate) return null
  return (
    <FormActions
      loading={loading}
      primaryLabel={formState === "ADD" ? addLabel : editLabel}
      onPrimaryButtonClick={onSubmitClick}
      onSecondaryButtonClick={closeForm}
    />
  )
}

export default MasterFormActions
