interface InputProps {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  value: string | number
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: "number" | "text" | "search"
}
const Input = ({ onKeyDown, onKeyPress, onChange, value, type = "text", placeholder }: InputProps) => {
  return (
    <input
      className="kms_input"
      type={type}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
