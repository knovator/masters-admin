import React, { KeyboardEventHandler } from "react"
import CreatableSelect from "react-select/creatable"

interface Option {
    label: string
    value: string
}

interface MultiSelectProps {
    value: string[]
    onChange: (newValue: string[]) => void
    rest?: React.HTMLAttributes<HTMLDivElement>
    label?: string
    error?: string
    className?: string
    isRequired?: boolean
    disabled?: boolean
}

const components = {
    DropdownIndicator: null,
}

const createOption = (label: string): Option => ({
    label,
    value: label,
})

const Multiselect: React.FC<MultiSelectProps> = ({ onChange, label, error, isRequired, disabled, value }) => {
    const [inputValue, setInputValue] = React.useState<string | undefined>("")
    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (!inputValue) return
        switch (event.key) {
            case "Enter":
            case "Tab":
                if (value === undefined) {
                    onChange([inputValue])
                    setInputValue("")
                    break
                }
                const updatedValue = [...value, inputValue]
                onChange(updatedValue)
                setInputValue("")
                event.preventDefault()
                break
        }
    }

    return (
        <div className="kms_input-wrapper">
            {label && (
                <label className="kms_input-label">
                    {label}
                    {isRequired && <span className="kms_required_astrisk"> *</span>}
                </label>
            )}
            <CreatableSelect
                isMulti
                isClearable
                components={components}
                inputValue={inputValue}
                menuIsOpen={false}
                onKeyDown={handleKeyDown}
                onInputChange={setInputValue}
                onChange={(newData) => {
                    onChange(newData.map((option) => option.value))
                }}
                placeholder="Type something and press enter..."
                value={value?.map(createOption)}
                isDisabled={disabled}
                className="h-9"
            />
            {error && <p className="kms_input-error">{error}</p>}
        </div>
    )
}

export default Multiselect
