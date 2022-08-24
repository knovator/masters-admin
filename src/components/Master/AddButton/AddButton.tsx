import React from "react"
import { Button } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"

const AddButton = () => {
    const { onChangeFormState, canAdd, t } = useMasterState()
    return <Button label={t("addMaster")} onClick={() => onChangeFormState("ADD")} disabled={!canAdd} />
}

export default AddButton
