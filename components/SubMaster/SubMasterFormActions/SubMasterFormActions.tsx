import { FormActions } from "components/Common"
import { useSubMasterState } from "context/SubMasterContext"
import { MutableRefObject } from "react"

interface SubMasterFormActionProps {
  formRef: MutableRefObject<HTMLFormElement | null>
  addLabel?: string
  editLabel?: string
}

const SubMasterFormActions = ({
  formRef,
  addLabel = "Add Sub Master",
  editLabel = "Edit Sub Master",
}: SubMasterFormActionProps) => {
  const { formState, closeForm, loading, canAdd, canUpdate } = useSubMasterState()
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

export default SubMasterFormActions
