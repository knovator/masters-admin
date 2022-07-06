import React, { useEffect, useState } from "react"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import { TRANSLATION_PAIRS_COMMON } from "../../../constants/common"

interface DeleteModalProps {
    formState: FormActionTypes | undefined
    onClose: () => void
    itemData: any
    onConfirmDelete: () => void
    permanentlyDelete?: string
    lossOfData?: string
    pleaseType?: string
    toProceedOrCancel?: string
    confirm?: string
}
const DeleteModal = ({
    formState,
    onClose,
    itemData,
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
            <div className="py-2 px-4 rounded-lg flex items-center gap-3 text-black text-sm bg-red-200">
                <p>
                    {permanentlyDelete} <b>{itemData?.name}</b>
                </p>
            </div>
            <div className="mt-3 text-black text-sm">
                <p>{lossOfData}</p>
                <p className="mt-3">
                    {pleaseType} <b className="text-black font-bold">{itemData?.name}</b> {toProceedOrCancel}
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
                    <Button label={confirm} disabled={userInput !== itemData?.name} onClick={onConfirmDelete} />
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal
