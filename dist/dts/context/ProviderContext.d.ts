import React from "react";
import { CALLBACK_CODES } from "../constants/common";
interface ProviderContextProviderProps extends React.PropsWithChildren, Omit<ProviderContextType, "onError" | "onSuccess" | "masterCode" | "onLogout" | "setMasterCode"> {
    onError?: (callback_code: CALLBACK_CODES, code: string, message: string) => void;
    onSuccess?: (callback_code: CALLBACK_CODES, code: string, message: string) => void;
    onLogout?: () => void;
}
declare const Provider: ({ children, baseUrl, token, dataGetter, paginationGetter, onError, onSuccess, onLogout, }: ProviderContextProviderProps) => JSX.Element;
export declare function useProviderState(): ProviderContextType;
export default Provider;
