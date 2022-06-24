import React from "react"
import classNames from "classnames"

export interface SelectProps {
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    rest?: any
    label?: string
    error?: string
    options?: { value: string; label: string }[]
    className?: string
    disabled?: boolean
}

const Select = ({ onChange, value, rest, label, error, options = [], className, disabled }: SelectProps) => {
    return (
        <div className="kms_input-wrapper">
            <label className="kms_input-label">{label}</label>
            <select
                data-testid={`input-select-${label}`}
                value={value}
                onChange={onChange}
                className={classNames("kms_input", className)}
                disabled={disabled}
                {...rest}
            >
                {options.map((option, index) => (
                    <option value={option.value} key={index} data-testid="select-option">
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="kms_input-error">{error}</p>}
        </div>
    )
}

export default Select
