interface InputProps {}
const Input = () => {
  return (
    <input
      className="kms_input w-10"
      maxLength={3}
      pattern="([0-9]|[0-9]|[0-9])"
      type="number"
      onKeyDown={handleNumbers}
      onKeyPress={pageHandler}
      value={currentPage}
      onChange={pageChange}
    />
  )
}

export default Input
