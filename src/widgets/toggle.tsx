import React from "react"

interface ToggleButtonProps {
    isChecked?: boolean
    disabled?: boolean
    onChange?: (status: boolean) => void
}

const ToggleButton = ({ isChecked, disabled, onChange }: ToggleButtonProps) => {
    return (
        <label className="kms_switch" data-testid="kms_switch">
            <input
                type="checkbox"
                onChange={() => onChange && onChange(!isChecked)}
                checked={isChecked}
                disabled={disabled}
            />
            <span className="slider round" />
        </label>
    )
}

export default ToggleButton
