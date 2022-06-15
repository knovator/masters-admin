import React, { createContext, useContext } from "react"

interface FormContextProviderProps extends React.PropsWithChildren {
  addNew: boolean
  closeForm: () => void
  setAddNew: (status: boolean) => void
  onDataSubmit: (data: any) => void
}

const FormContext = createContext<FormContextType | null>(null)

const FormContextProvider = ({ addNew, setAddNew, closeForm, onDataSubmit, children }: FormContextProviderProps) => {
  return <FormContext.Provider value={{ addNew, setAddNew, closeForm, onDataSubmit }}>{children}</FormContext.Provider>
}

export function useFormState() {
  const context = useContext(FormContext)
  if (!context) throw new Error("Form Context must be used within FormContext.Provider")

  return context
}

export default FormContextProvider
