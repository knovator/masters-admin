import React from "react";
import { CALLBACK_CODES } from "../constants/common";
interface ProviderContextProviderProps extends React.PropsWithChildren, Omit<ProviderContextType, "onError" | "onSuccess" | "masterCode" | "onLogout" | "setMasterCode" | "dataGetter" | "paginationGetter"> {
    onError?: (callback_code: CALLBACK_CODES, code: string, message: string) => void;
    onSuccess?: (callback_code: CALLBACK_CODES, code: string, message: string) => void;
    onLogout?: () => void;
    dataGetter?: (response: any) => any[];
    paginationGetter?: (response: any) => any;
}
declare const Provider: ({ children, baseUrl, token, dataGetter, paginationGetter, onError, onSuccess, onLogout, }: ProviderContextProviderProps) => JSX.Element;
export declare function useProviderState(): ProviderContextType;
export default Provider;
