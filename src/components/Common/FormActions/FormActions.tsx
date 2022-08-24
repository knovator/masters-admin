import React from "react"
import Button from "../Button"

interface FormActionsProps {
    loading?: boolean
    primaryLabel?: string
    secondaryLabel?: string
    onPrimaryButtonClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onSecondaryButtonClick?: () => void
}

const FormActions = ({
    loading = false,
    primaryLabel = "Submit",
    secondaryLabel = "Cancel",
    onPrimaryButtonClick,
    onSecondaryButtonClick,
}: FormActionsProps) => {
    return (
        <>
            <Button variant="secondary" label={secondaryLabel} disabled={loading} onClick={onSecondaryButtonClick} />
            <Button label={primaryLabel} onClick={onPrimaryButtonClick} disabled={loading} />
        </>
    )
}

export default FormActions
