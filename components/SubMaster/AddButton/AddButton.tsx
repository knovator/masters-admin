import { Button } from "components/Common"
import { useSubMasterState } from "context/SubMasterContext"

interface AddButtonProps {
  label?: string
}

const AddButton = ({ label = "Add Sub Master" }: AddButtonProps) => {
  const { onChangeFormState, canAdd } = useSubMasterState()
  if (!canAdd) return null
  return <Button label={label} onClick={() => onChangeFormState("ADD")} />
}

export default AddButton
