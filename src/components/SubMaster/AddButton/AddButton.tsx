import React from "react"
import { Button } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"


const AddButton = () => {
    const { onChangeFormState, canAdd, t } = useSubMasterState()
    return <Button label={t("addSubMaster")} onClick={() => onChangeFormState("ADD")} disabled={!canAdd} />
}

export default AddButton
