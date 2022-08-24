import React from "react"
import { FormActions } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"
import { useProviderState } from "../../../context/ProviderContext"
import { CALLBACK_CODES } from "../../../constants/common"

const SubMasterFormActions = ({ formRef }: FormActionWrapperProps) => {
    const { onError } = useProviderState()
    const { formState, closeForm, loading, canAdd, canUpdate, t } = useSubMasterState()
    const onSubmitClick = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!formRef) {
            return onError(CALLBACK_CODES.INTERNAL, "error", `formRef is required to submit the form!`)
        } else if (!formRef.current) {
            return onError(
                CALLBACK_CODES.INTERNAL,
                "error",
                `formRef is empty, make sure it's passed as prop to the form!`,
            )
        }
        // formRef is provided
        e?.preventDefault()
        formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
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
