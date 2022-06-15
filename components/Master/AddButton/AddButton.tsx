import { Button } from "components/Common"
import { useFormState } from "context/FormContext"

const AddButton = () => {
  const { onChangeFormState } = useFormState()
  return <Button label="Add Master" onClick={() => onChangeFormState("ADD")} />
}

export default AddButton
