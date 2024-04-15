import React from "react"
import { Button } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"


const AddButton = () => {
    const { onChangeFormState, canAdd, submasterTranslations } = useSubMasterState()
    return (
        <Button
            label={submasterTranslations.addSubMaster}
            onClick={() => onChangeFormState("ADD")}
            disabled={!canAdd}
        />
    )
}

export default AddButton
