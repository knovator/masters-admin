interface ToggleButtonProps {
  isChecked?: boolean
  disabled?: boolean
  onChange?: (status: boolean) => void
}

const ToggleButton = ({ isChecked, disabled, onChange }: ToggleButtonProps) => {
  return (
    <div>
      <label className="switch">
        <input
          className="toggle bg-slate-400"
          type="checkbox"
          onChange={() => onChange && onChange(!isChecked)}
          checked={isChecked}
          disabled={disabled}
        />
        <span className="slider round" />
      </label>
    </div>
  )
}

export default ToggleButton
