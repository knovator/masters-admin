import React, { createContext, useContext, useState } from "react"
import { TRANSLATION_PAIRS_COMMON } from "../constants/common"
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
    translations,
    switchClass = "kms_switch",
}: ProviderContextProviderProps) => {
    const [selectedMaster, setSelectedMaster] = useState()
    const [languages, setLanguages] = useState<LanguageType[]>([])
    let ctxDataGetter = typeof dataGetter === "function" ? dataGetter : (response: any) => response?.data?.docs
    let ctxPaginatonGetter =
        typeof paginationGetter === "function" ? paginationGetter : (response: any) => response?.data
    return (
        <ProviderContext.Provider
            value={{
                baseUrl,
                token,
                languages,
                setLanguages,
                dataGetter: ctxDataGetter,
                paginationGetter: ctxPaginatonGetter,
                onError,
                onSuccess,
                onLogout,
                selectedMaster,
                setSelectedMaster,
                switchClass,
                commonTranslations: {
                    ...TRANSLATION_PAIRS_COMMON,
                    ...translations,
                },
            }}
        >
            {children}
        </ProviderContext.Provider>
    )
}

export function useProviderState() {
    const context = useContext(ProviderContext)
    if (!context) throw new Error("Provider Context must be used within ProviderContext.Provider")

    return context
}

export default Provider
