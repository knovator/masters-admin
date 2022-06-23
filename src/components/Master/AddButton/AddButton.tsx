import React from "react"
import { Button } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"

interface AddButtonProps {}

const AddButton = ({}: AddButtonProps) => {
    const { onChangeFormState, canAdd, t } = useMasterState()
    if (!canAdd) return null
    return <Button label={t("addMaster")} onClick={() => onChangeFormState("ADD")} />
}

export default AddButton
