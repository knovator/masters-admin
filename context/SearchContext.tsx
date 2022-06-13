import React, { createContext, useContext } from "react"

interface SearchContextProviderProps extends React.PropsWithChildren {}

const SearchContext = createContext<SearchContextType | null>(null)

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  return <SearchContext.Provider value={{ searchOnEnter: false }}>{children}</SearchContext.Provider>
}

export function useSearchState() {
  const context = useContext(SearchContext)
  if (!context) throw new Error("Search Context must be used within SearchContextProvider")

  return context
}

export default SearchContextProvider
