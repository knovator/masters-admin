import { useCallback, useEffect, useRef, useState } from "react"
import { CALLBACK_CODES, INTERNAL_ERROR_CODE } from "../constants/common"
import { useProviderState } from "../context/ProviderContext"
import usePagination from "./usePagination"
import request, { getApiType } from "../api"
import { build_path } from "../utils/util"
import { Routes_Input, SortConfigType, FormActionTypes } from "@knovator/masters-admin"

interface UseMasterProps {
    defaultLimit: number
    routes?: Routes_Input
    defaultSort?: SortConfigType
    preConfirmDelete?: (data: { row: any }) => Promise<boolean>
}

const useMaster = ({ defaultLimit, routes, defaultSort = ["seq", 1], preConfirmDelete }: UseMasterProps) => {
    const [list, setList] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [itemData, setItemData] = useState<any | null>(null)
    const [formState, setFormState] = useState<FormActionTypes>()

    const sortConfigRef = useRef<SortConfigType>(defaultSort)

    const { baseUrl, token, dataGetter, paginationGetter, onError, onSuccess, onLogout, masterCode } =
        useProviderState()
    const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination({ defaultLimit })

    const handleError = (code: CALLBACK_CODES) => (error: any) => {
        const { data = {} } = error?.response || {}
        if (data?.code === "UNAUTHENTICATED") {
            onLogout()
        }
        onError(code, "error", data?.message)
    }

    const getSubMastersList = useCallback(
        async (search?: string) => {
            try {
                let sortConfig = sortConfigRef.current
                setLoading(true)
                let api = getApiType({ routes, action: "LIST", module: "masters" })
                let response = await request({
                    baseUrl,
                    token,
                    method: api.method,
                    url: api.url,
                    onError: handleError(CALLBACK_CODES.GET_ALL),
                    data: {
                        search,
                        query: {
                            parentCode: masterCode,
                        },
                        options: {
                            sort: {
                                [sortConfig[0]]: sortConfig[1],
                            },
                            offset: filter.offset,
                            limit: filter.limit,
                            page: currentPage,
                            pagination: true,
                        },
                    },
                })
                if (response?.code === "SUCCESS") {
                    onSuccess(CALLBACK_CODES.GET_ALL, response.code, response.message)
                    setLoading(false)
                    setTotalPages(paginationGetter(response).totalPages)
                    setTotalRecords(paginationGetter(response).totalDocs)
                    return setList(dataGetter(response))
                }
                setLoading(false)
                onError(CALLBACK_CODES.GET_ALL, response.code, response.message)
            } catch (error) {
                setLoading(false)
                onError(CALLBACK_CODES.GET_ALL, INTERNAL_ERROR_CODE, (error as Error).message)
            }
        },
        [
            routes,
            baseUrl,
            token,
            masterCode,
            filter.offset,
            filter.limit,
            currentPage,
            onError,
            onSuccess,
            paginationGetter,
            dataGetter,
        ],
    )
    const onChangeSortConfig = (data: SortConfigType) => {
        sortConfigRef.current = data
        getSubMastersList()
    }
    const partialUpdate = useCallback(
        async (id: string, data: any) => {
            try {
                let api = getApiType({ routes, action: "UPDATE", module: "masters", id })
                let response = await request({
                    data,
                    baseUrl,
                    token,
                    method: api.method,
                    url: api.url,
                    onError: handleError(CALLBACK_CODES.UPDATE),
                })
                if (response?.code === "SUCCESS") {
                    onSuccess(CALLBACK_CODES.UPDATE, response.code, response.message)
                    getSubMastersList()
                } else {
                    onError(CALLBACK_CODES.UPDATE, response.code, response.message)
                }
            } catch (error) {
                onError(CALLBACK_CODES.UPDATE, INTERNAL_ERROR_CODE, (error as Error).message)
            }
        },
        [baseUrl, getSubMastersList, onError, onSuccess, routes, token],
    )
    const onDataSubmit = async (data: any) => {
        setLoading(true)
        let finalData = { ...data }
        if (formState === "ADD") finalData.parentCode = masterCode
        let code = formState === "ADD" ? CALLBACK_CODES.CREATE : CALLBACK_CODES.UPDATE
        try {
            let api = getApiType({
                routes,
                action: formState === "ADD" ? "CREATE" : "UPDATE",
                module: "masters",
                id: itemData?.id,
            })
            let response = await request({
                baseUrl,
                token,
                method: api.method,
                url: api.url,
                data: finalData,
                onError: handleError(code),
            })
            if (response?.code === "SUCCESS") {
                setLoading(false)
                onSuccess(code, response?.code, response?.message)
                getSubMastersList()
                onCloseForm()
            } else {
                setLoading(false)
                onError(code, response?.code, response?.message)
            }
        } catch (error) {
            setLoading(false)
            onError(code, INTERNAL_ERROR_CODE, (error as Error).message)
        }
    }
    const onCloseForm = () => {
        setFormState(undefined)
        setItemData(null)
    }
    const onCofirmDeleteMaster = async () => {
        try {
            let proceed = true
            if (typeof preConfirmDelete === "function") {
                try {
                    proceed = await preConfirmDelete({ row: itemData })
                } catch (error) {
                    proceed = false
                }
            }

            if (proceed) {
                setLoading(true)
                let api = getApiType({
                    routes,
                    action: "DELETE",
                    module: "masters",
                })
                let response = await request({
                    baseUrl,
                    token,
                    method: api.method,
                    url: api.url,
                    onError: handleError(CALLBACK_CODES.DELETE),
                    data: {
                        id: [itemData?.id],
                    },
                })
                if (response?.code === "SUCCESS") {
                    setLoading(false)
                    onSuccess(CALLBACK_CODES.DELETE, response?.code, response?.message)
                    getSubMastersList()
                    onCloseForm()
                    return
                }
                setLoading(false)
                onError(CALLBACK_CODES.DELETE, response?.code, response?.message)
                onCloseForm()
            }
        } catch (error) {
            setLoading(false)
            onError(CALLBACK_CODES.DELETE, INTERNAL_ERROR_CODE, (error as Error).message)
            onCloseForm()
        }
    }
    const onChangeFormState = async (state: FormActionTypes, data?: any) => {
        setItemData(data || null)
        setFormState(state)
    }
    const onChangeSequence = async (id: string, seq: number) => {
        try {
            let api = getApiType({ routes, action: "SEQUENCE", module: "masters", id })
            let response = await request({
                data: { seq },
                baseUrl,
                token,
                method: api.method,
                url: api.url,
                onError: handleError(CALLBACK_CODES.SEQUENCE_UPDATE),
            })
            if (response?.code === "SUCCESS") {
                onSuccess(CALLBACK_CODES.SEQUENCE_UPDATE, response.code, response.message)
                sortConfigRef.current = ["seq", 1]
                getSubMastersList()
            } else {
                onError(CALLBACK_CODES.SEQUENCE_UPDATE, response.code, response.message)
            }
        } catch (error) {
            onError(CALLBACK_CODES.SEQUENCE_UPDATE, INTERNAL_ERROR_CODE, (error as Error).message)
        }
    }
    const onImageUpload = async (file: File): Promise<{ fileUrl: string; fileId: string }> => {
        try {
            const payload = new FormData()
            payload?.append("folder", "images")
            payload?.append("file", file, file.name)
            let api = getApiType({ routes, action: "IMAGE_UPLOAD", module: "masters" })
            let response = await request({
                data: payload,
                baseUrl,
                token,
                method: api.method,
                url: api.url,
                config: {
                    contentType: "multipart/form-data",
                },
                onError: handleError(CALLBACK_CODES.IMAGE_UPLOAD),
            })
            if (response.code === "SUCCESS") {
                return {
                    fileId: response?.data[0]?._id,
                    fileUrl: build_path(baseUrl, response?.data[0]?.uri),
                }
            } else throw new Error(response.message)
        } catch (error) {
            throw new Error("File upload error")
        }
    }
    useEffect(() => {
        if (masterCode) getSubMastersList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, currentPage, masterCode])

    return {
        list,
        getSubMastersList,
        loading,
        setLoading,
        partialUpdate,
        onChangeSequence,

        // Pagination
        pageSize,
        totalPages,
        currentPage,
        totalRecords,
        setCurrentPage,
        setPageSize,

        // Sorting
        sortConfig: sortConfigRef.current,
        setSortConfig: onChangeSortConfig,

        // Form
        formState,
        itemData,
        onChangeFormState,
        onCloseForm,
        onDataSubmit,
        onCofirmDeleteMaster,
        onImageUpload,
    }
}

export default useMaster
