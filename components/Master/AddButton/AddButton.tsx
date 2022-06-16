import { Button } from "components/Common"
import { useFormState } from "context/FormContext"

const AddButton = () => {
  const { onChangeFormState, canAdd } = useFormState()
  if (!canAdd) return null
  return <Button label="Add Master" onClick={() => onChangeFormState("ADD")} />
}

export default AddButton
