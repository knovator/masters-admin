/// <reference types="react" />
interface ToggleButtonProps {
    isChecked?: boolean;
    disabled?: boolean;
    onChange?: (status: boolean) => void;
}
declare const ToggleButton: ({ isChecked, disabled, onChange }: ToggleButtonProps) => JSX.Element;
export default ToggleButton;
