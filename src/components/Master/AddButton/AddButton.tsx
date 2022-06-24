import React from "react"
import { Button } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"

const AddButton = () => {
    const { onChangeFormState, canAdd, t } = useMasterState()
    if (!canAdd) return null
    return <Button label={t("addMaster")} onClick={() => onChangeFormState("ADD")} />
}

export default AddButton
