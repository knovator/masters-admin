import { Button } from "components/Common"
import { useMasterState } from "context/MasterContext"

interface AddButtonProps {
  label?: string
}

const AddButton = ({ label = "Add Master" }: AddButtonProps) => {
  const { onChangeFormState, canAdd } = useMasterState()
  if (!canAdd) return null
  return <Button label={label} onClick={() => onChangeFormState("ADD")} />
}

export default AddButton
