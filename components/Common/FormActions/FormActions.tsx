import { Button } from ".."

interface FormActionsProps {
  primaryLabel?: string
  secondaryLabel?: string
  onPrimaryButtonClick?: () => void
  onSecondaryButtonClick?: () => void
}

const FormActions = ({
  primaryLabel = "Submit",
  secondaryLabel = "Cancel",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: FormActionsProps) => {
  return (
    <>
      <Button variant="secondary" label={secondaryLabel} onClick={onSecondaryButtonClick} />
      <Button label={primaryLabel} onClick={onPrimaryButtonClick} />
    </>
  )
}

export default FormActions
