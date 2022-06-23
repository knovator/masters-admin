import React from "react";
interface FormActionsProps {
    loading?: boolean;
    primaryLabel?: string;
    secondaryLabel?: string;
    onPrimaryButtonClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onSecondaryButtonClick?: () => void;
}
declare const FormActions: ({ loading, primaryLabel, secondaryLabel, onPrimaryButtonClick, onSecondaryButtonClick, }: FormActionsProps) => JSX.Element;
export default FormActions;
