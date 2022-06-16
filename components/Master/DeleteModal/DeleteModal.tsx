import { Modal, Input, Button } from "components/Common"
import { useState } from "react"

interface DeleteModalProps {
  formState: FormActionTypes | undefined
  onClose: () => void
  itemData: any
  onConfirmDelete: () => void
}
const DeleteModal = ({ formState, onClose, itemData, onConfirmDelete }: DeleteModalProps) => {
  const [userInput, setUserInput] = useState<string>("")
  return (
    <Modal open={formState === "DELETE"} onClose={onClose} title="Confirmation Required">
      <div className="py-2 px-4 rounded-lg flex items-center gap-3 text-black text-sm bg-red-200">
        <p>
          You are about to permanently delete the <b>{itemData?.name}</b>
        </p>
      </div>
      <div className="mt-3 text-black text-sm">
        <p>This action can lead to data loss. To prevent accidental actions we ask you to confirm your intention.</p>
        <p className="mt-3">
          Please type <b className="text-black font-bold">{itemData?.name}</b> to processed or close this modal to
          cancel.
        </p>
      </div>
      <div className="mt-3 flex flex-row gap-3">
        <Input
          placeholder="Type Here"
          className="w-full flex-grow"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="col-span-3">
          <Button label="Confirm" disabled={userInput !== itemData?.name} onClick={onConfirmDelete} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
