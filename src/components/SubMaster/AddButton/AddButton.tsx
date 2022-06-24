import React from "react"
import { Button } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"

interface AddButtonProps {}

const AddButton = ({}: AddButtonProps) => {
    const { onChangeFormState, canAdd, t } = useSubMasterState()
    if (!canAdd) return null
    return <Button label={t("addSubMaster")} onClick={() => onChangeFormState("ADD")} />
}

export default AddButton
