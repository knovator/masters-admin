import classNames from "classnames"

interface ButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary"
}

const Button = ({ label, onClick, disabled, variant = "primary" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames("kms_btn", {
        "kms_btn-primary": variant === "primary",
        "kms_btn-secondary": variant === "secondary",
      })}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
