import React, { createContext, useContext, useState } from "react"
import { CALLBACK_CODES } from "../constants/common"

interface ProviderContextProviderProps
    extends React.PropsWithChildren,
        Omit<
            ProviderContextType,
            "onError" | "onSuccess" | "masterCode" | "onLogout" | "setMasterCode" | "dataGetter" | "paginationGetter"
        > {
    onError?: (callback_code: CALLBACK_CODES, code: string, message: string) => void
    onSuccess?: (callback_code: CALLBACK_CODES, code: string, message: string) => void
    onLogout?: () => void
    dataGetter?: (response: any) => any[]
    paginationGetter?: (response: any) => any
}

const ProviderContext = createContext<ProviderContextType | null>(null)

const Provider = ({
    children,
    baseUrl,
    token,
    dataGetter = (response: any) => response.data.docs,
    paginationGetter = (response: any) => response.data,
    onError = () => {},
    onSuccess = () => {},
    onLogout = () => {},
}: ProviderContextProviderProps) => {
    const [masterCode, setMasterCode] = useState<string>("")
    let ctxDataGetter = typeof dataGetter === "function" ? dataGetter : (response: any) => response?.data?.docs
    let ctxPaginatonGetter =
        typeof paginationGetter === "function" ? paginationGetter : (response: any) => response?.data
    return (
        <ProviderContext.Provider
            value={{
                baseUrl,
                token,
                dataGetter: ctxDataGetter,
                paginationGetter: ctxPaginatonGetter,
                onError,
                onSuccess,
                masterCode,
                setMasterCode,
                onLogout,
            }}
        >
            {children}
        </ProviderContext.Provider>
    )
}

export function useProviderState() {
    const context = useContext(ProviderContext)
    if (!context) throw new Error("Master Context must be used within MasterContext.Provider")

    return context
}

export default Provider
