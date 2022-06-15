import React, { createContext, useContext } from "react"

interface FormContextProviderProps extends React.PropsWithChildren {
  formState: FormActionTypes | undefined
  closeForm: () => void
  onDataSubmit: (data: any) => void
  onChangeFormState: (status: FormActionTypes) => void
  updateData: any
  loading: boolean
}

const FormContext = createContext<FormContextType | null>(null)

const FormContextProvider = ({
  formState,
  onChangeFormState,
  closeForm,
  onDataSubmit,
  children,
  loading,
  updateData,
}: FormContextProviderProps) => {
  return (
    <FormContext.Provider value={{ loading, formState, onChangeFormState, closeForm, onDataSubmit, updateData }}>
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
