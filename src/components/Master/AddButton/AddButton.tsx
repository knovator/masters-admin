import React from "react"
import { Button } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"

const AddButton = ({ className }: ButtonProps) => {
    const { onChangeFormState, canAdd, masterTranslations } = useMasterState()
    return <Button className={className} label={masterTranslations.addMaster} onClick={() => onChangeFormState("ADD")} disabled={!canAdd} />
}

export default AddButton
