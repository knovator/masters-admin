import React from "react"
import { FormActions } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"
import { useProviderState } from "../../../context/ProviderContext"
import { CALLBACK_CODES } from "../../../constants/common"

const MasterFormActions = ({ formRef }: FormActionWrapperProps) => {
    const { onError, commonTranslations } = useProviderState()
    const { formState, closeForm, loading, canAdd, canUpdate, masterTranslations } = useMasterState()
    const onSubmitClick = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!formRef) {
            return onError(CALLBACK_CODES.INTERNAL, "error", `formRef is required to submit the form!`)
        } else if (!formRef.current) {
            return onError(
                CALLBACK_CODES.INTERNAL,
                "error",
                `formRef is empty, make sure it's passed as 'ref' prop to the form!`,
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
            primaryLabel={formState === "ADD" ? commonTranslations.create : commonTranslations.update}
            onPrimaryButtonClick={onSubmitClick}
            onSecondaryButtonClick={closeForm}
            secondaryLabel={commonTranslations.cancel}
        />
    )
}

export default MasterFormActions
