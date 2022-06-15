import { Button } from "components/Common"
import { useFormState } from "context/FormContext"

const AddButton = () => {
  const { setAddNew } = useFormState()
  return <Button label="Add Master" onClick={() => setAddNew(true)} />
}

export default AddButton
