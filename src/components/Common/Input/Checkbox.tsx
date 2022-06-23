import React from "react"
import classNames from "classnames"

export interface CheckboxProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    rest?: any
    label?: string
    error?: string
    className?: string
    disabled?: boolean
}
const Checkbox = ({ onChange, rest, label, error, className, disabled }: CheckboxProps) => {
    return (
        <div className="kms_input-wrapper">
            <label className="kms_input-label">{label}</label>
            <input
                data-testid={`input-checkbox-${label}`}
                className={classNames("kms_input-checkbox", className)}
                disabled={disabled}
                type="checkbox"
                onChange={onChange}
                {...rest}
            />
            {error && <p className="kms_input-error">{error}</p>}
        </div>
    )
}

export default Checkbox
