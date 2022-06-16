import React, { createContext, useContext } from "react"

interface FormContextProviderProps extends React.PropsWithChildren, FormContextType {}

const FormContext = createContext<FormContextType | null>(null)

const FormContextProvider = ({
  formState,
  onChangeFormState,
  closeForm,
  onDataSubmit,
  children,
  loading,
  updateData,
  canAdd,
  canUpdate,
}: FormContextProviderProps) => {
  return (
    <FormContext.Provider
      value={{ loading, formState, onChangeFormState, closeForm, onDataSubmit, updateData, canAdd, canUpdate }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useFormState() {
  const context = useContext(FormContext)
  if (!context) throw new Error("Form Context must be used within FormContext.Provider")

  return context
}

export default FormContextProvider
