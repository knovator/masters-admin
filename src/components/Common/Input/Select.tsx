import React from "react"
import classNames from "classnames"

const Select = ({
    onChange,
    value,
    rest,
    label,
    error,
    options = [],
    className,
    isRequired,
    disabled,
}: SelectProps) => {
    return (
        <div className="kms_input-wrapper">
            {label && (
                <label className="kms_input-label">
                    {label}
                    {isRequired && <span className="kms_required_astrisk"> *</span>}
                </label>
            )}
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
