import { useCallback, useEffect, useRef, useState } from "react"
import { CALLBACK_CODES, INTERNAL_ERROR_CODE } from "../constants/common"
import { useProviderState } from "../context/ProviderContext"
import usePagination from "./usePagination"
import request, { getApiType } from "../api"

interface UseMasterProps {
    defaultLimit: number
    routes?: Routes_Input
    defaultSort?: SortConfigType
    preConfirmDelete?: (data: { row: any }) => Promise<boolean>
}

const useMaster = ({ defaultLimit, routes, defaultSort = ["createdAt", 1], preConfirmDelete }: UseMasterProps) => {
    const [list, setList] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [itemData, setItemData] = useState<any | null>(null)
    const [formState, setFormState] = useState<FormActionTypes>()

    const sortConfigRef = useRef<SortConfigType>(defaultSort)

    const { baseUrl, token, dataGetter, paginationGetter, onError, onLogout, onSuccess } = useProviderState()
    const { setPageSize, pageSize, currentPage, setCurrentPage, filter } = usePagination({ defaultLimit })

    const handleError = (code: CALLBACK_CODES) => (error: any) => {
        const { data = {} } = error?.response || {}
        if (data?.code === "UNAUTHENTICATED") {
            onLogout()
        }
        onError(code, "error", data?.message)
    }
    const getMastersList = useCallback(
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
            baseUrl,
            currentPage,
            dataGetter,
            filter.limit,
            filter.offset,
            onError,
            onSuccess,
            paginationGetter,
            routes,
            token,
        ],
    )
    const onChangeSortConfig = (data: SortConfigType) => {
        sortConfigRef.current = data
        getMastersList()
    }
    const partialUpdate = useCallback(
        async (id: string, data: any) => {
            try {
                let api = getApiType({ routes, action: "UPDATE", module: "masters", id })
                let response = await request({
                    data,
                    baseUrl,
                    token,
                    url: api.url,
                    method: api.method,
                    onError: handleError(CALLBACK_CODES.UPDATE),
                })
                if (response?.code === "SUCCESS") {
                    onSuccess(CALLBACK_CODES.UPDATE, response.code, response.message)
                    getMastersList()
                } else {
                    onError(CALLBACK_CODES.UPDATE, response.code, response.message)
                }
            } catch (error) {
                onError(CALLBACK_CODES.UPDATE, INTERNAL_ERROR_CODE, (error as Error).message)
            }
        },
        [baseUrl, getMastersList, onError, onSuccess, routes, token],
    )
    const onDataSubmit = async (data: any) => {
        setLoading(true)
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
                data,
                url: api.url,
                method: api.method,
                onError: handleError(code),
            })
            if (response?.code === "SUCCESS") {
                setLoading(false)
                onSuccess(code, response?.code, response?.message)
                getMastersList()
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
                    getMastersList()
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

    useEffect(() => {
        getMastersList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, currentPage])

    return {
        list,
        getMastersList,
        loading,
        setLoading,
        partialUpdate,

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
    }
}

export default useMaster
