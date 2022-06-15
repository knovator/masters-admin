import classNames from "classnames"

interface SelectProps {
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  rest?: any
  label?: string
  error?: string
  options?: { value: string; label: string }[]
  className?: string
}

const Select = ({ onChange, value, rest, label, error, options = [], className }: SelectProps) => {
  return (
    <div className="kms_input-wrapper">
      <label className="kms_input-label">{label}</label>
      <select value={value} onChange={onChange} className={classNames("kms_input", className)} {...rest}>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="kms_input-error">{error}</p>}
    </div>
  )
}

export default Select
