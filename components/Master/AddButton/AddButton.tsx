import { Button } from "components/Common"
import { useMasterState } from "context/MasterContext"

const AddButton = () => {
  const { setAddNew } = useMasterState()
  return <Button label="Add Master" onClick={() => setAddNew(true)} />
}

export default AddButton
