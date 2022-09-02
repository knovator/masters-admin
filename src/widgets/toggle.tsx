import React from "react"

interface ToggleButtonProps {
    isChecked?: boolean
    disabled?: boolean
    onChange?: (status: boolean) => void
    switchClass?: string
}

const ToggleButton = ({ isChecked, disabled, onChange, switchClass = "kms_switch" }: ToggleButtonProps) => {
    return (
        <label className={switchClass} data-testid="kms_switch">
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
