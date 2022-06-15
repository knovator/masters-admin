import classNames from "classnames"

interface TextareaProps {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string | number
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void
  rest?: any
  label?: string
  error?: string
  className?: string
}
const Textarea = ({
  onKeyDown,
  onKeyPress,
  onChange,
  onInput,
  value,
  placeholder,
  rest,
  label,
  error,
  className,
}: TextareaProps) => {
  return (
    <div className="kms_input-wrapper">
      <label className="kms_input-label">{label}</label>
      <textarea
        className={classNames("kms_input", className)}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        onInput={onInput}
        {...rest}
      />
      {error && <p className="kms_input-error">{error}</p>}
    </div>
  )
}

export default Textarea
