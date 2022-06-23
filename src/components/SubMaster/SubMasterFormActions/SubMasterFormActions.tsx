import React, { MutableRefObject } from "react"
import { FormActions } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"

interface SubMasterFormActionProps {
    formRef: MutableRefObject<HTMLFormElement | null>
}

const SubMasterFormActions = ({ formRef }: SubMasterFormActionProps) => {
    const { formState, closeForm, loading, canAdd, canUpdate, t } = useSubMasterState()
    const onSubmitClick = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!formRef.current) e?.preventDefault()
        else formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
    }

    if (!canAdd && !canUpdate) return null
    return (
        <FormActions
            loading={loading}
            primaryLabel={formState === "ADD" ? t("addSubMaster") : t("updateSubMaster")}
            onPrimaryButtonClick={onSubmitClick}
            onSecondaryButtonClick={closeForm}
        />
    )
}

export default SubMasterFormActions
