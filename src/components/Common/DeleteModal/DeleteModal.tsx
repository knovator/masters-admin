import React, { useEffect, useState } from "react"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import { TRANSLATION_PAIRS_COMMON } from "../../../constants/common"

interface DeleteModalProps {
    formState: FormActionTypes | undefined
    onClose: () => void
    onConfirmDelete: () => void
    permanentlyDelete?: string
    lossOfData?: string
    pleaseType?: string
    toProceedOrCancel?: string
    confirm?: string
    name?: string
}
const DeleteModal = ({
    formState,
    onClose,
    name,
    onConfirmDelete,
    permanentlyDelete = TRANSLATION_PAIRS_COMMON.permanentlyDelete,
    lossOfData = TRANSLATION_PAIRS_COMMON.lossOfData,
    pleaseType = TRANSLATION_PAIRS_COMMON.pleaseType,
    toProceedOrCancel = TRANSLATION_PAIRS_COMMON.toProceedOrCancel,
    confirm = TRANSLATION_PAIRS_COMMON.confirm,
}: DeleteModalProps) => {
    const [userInput, setUserInput] = useState<string>("")
    useEffect(() => {
        setUserInput("")
    }, [formState])
    return (
        <Modal open={formState === "DELETE"} onClose={onClose} title="Confirmation Required">
            <div className="kms_delete-header">
                <p>
                    {permanentlyDelete} <b>{name}</b>
                </p>
            </div>
            <div className="kms_delete-content">
                <p>{lossOfData}</p>
                <p className="kms_delete-note">
                    {pleaseType} <b className="text-black font-bold">{name}</b> {toProceedOrCancel}
                </p>
            </div>
            <div className="kms_delete-actions">
                <Input
                    placeholder="Type Here"
                    className="kms_delete-input"
                    wrapperClassName="kms_w-full"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <div className="kms_delete-buttons">
                    <Button label={confirm} disabled={userInput !== name} onClick={onConfirmDelete} />
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal
