import React, { MutableRefObject } from "react"
import { FormActions } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"

interface MasterFormActionProps {
    formRef: MutableRefObject<HTMLFormElement | null>
}

const MasterFormActions = ({ formRef }: MasterFormActionProps) => {
    const { formState, closeForm, loading, canAdd, canUpdate, t } = useMasterState()
    const onSubmitClick = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!formRef.current) e?.preventDefault()
        else formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
    }

    if (!canAdd && !canUpdate) return null
    return (
        <FormActions
            loading={loading}
            primaryLabel={formState === "ADD" ? t("addMaster") : t("updateMaster")}
            onPrimaryButtonClick={onSubmitClick}
            onSecondaryButtonClick={closeForm}
            secondaryLabel={t("common:cancel")}
        />
    )
}

export default MasterFormActions
