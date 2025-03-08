import React from "react"
import { Button } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"

interface buttonProps {
    className?: string
}

const AddButton = ({ className }: buttonProps) => {
    const { onChangeFormState, canAdd, submasterTranslations } = useSubMasterState()
    return (
        <Button
            className={className}
            label={submasterTranslations.addSubMaster}
            onClick={() => onChangeFormState("ADD")}
            disabled={!canAdd}
        />
    )
}

export default AddButton
