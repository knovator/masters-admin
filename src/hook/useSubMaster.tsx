import { useCallback, useEffect, useRef, useState } from "react"
import { CALLBACK_CODES, INTERNAL_ERROR_CODE } from "../constants/common"
import { useProviderState } from "../context/ProviderContext"
import usePagination from "./usePagination"
import request, { getApiType } from "../api"
import { build_path } from "../utils/util"

interface UseMasterProps {
    defaultLimit: number
    routes?: Routes_Input
    defaultSort?: SortConfigType
    preConfirmDelete?: (data: { row: any }) => Promise<boolean>
}

const useSubMaster = ({ defaultLimit, routes, defaultSort = ["seq", 1], preConfirmDelete }: UseMasterProps) => {
    const [list, setList] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [sequencing, setSequencing] = useState(false)
    const [itemData, setItemData] = useState<any | null>(null)
    const [formState, setFormState] = useState<FormActionTypes>()

    const sortConfigRef = useRef<SortConfigType>(defaultSort)

    const { baseUrl, token, dataGetter, paginationGetter, onError, onSuccess, onLogout, selectedMaster } =
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
        async (search?: string, all: boolean = false) => {
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
                            parentCode: selectedMaster?.code,
                        },
                        options: {
                            sort: {
                                [sortConfig[0]]: sortConfig[1],
                            },
                            offset: filter.offset,
                            limit: filter.limit,
                            page: currentPage,
                            pagination: true,
                            populate: ["img"],
                        },
                        all,
                    },
                })
                if (response?.code === "SUCCESS") {
                    setLoading(false)
                    setTotalPages(paginationGetter(response).totalPages)
                    setTotalRecords(paginationGetter(response).totalDocs)
                    return setList(dataGetter(response))
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        },
        [
            routes,
            baseUrl,
            token,
            selectedMaster,
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
        if (formState === "ADD") {
            finalData.parentCode = selectedMaster?.code
            finalData.parentId = selectedMaster?.id
        }
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
            }
        } catch (error) {}
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
    const onChangeSequence = async (sourceIndex: number, destinationIndex: number) => {
        try {
            setList((listData) => {
                let temporaryData = [...listData]
                const [selectedRow] = temporaryData.splice(sourceIndex, 1)
                temporaryData.splice(destinationIndex, 0, selectedRow)
                temporaryData = temporaryData.map((item, index) => {
                    return {
                        ...item,
                        seq: index + 1,
                    }
                })
                return temporaryData
            })
        } catch (error) {
            console.log(error)
        }
    }
    const onConfirmSequence = async () => {
        try {
            let api = getApiType({ routes, action: "SEQUENCE", module: "masters" })
            let sequences = list.map((item) => ({
                id: item.id || item._id,
                seq: item.seq,
            }))
            setLoading(true)
            let response = await request({
                data: { sequences },
                baseUrl,
                token,
                method: api.method,
                url: api.url,
                onError: handleError(CALLBACK_CODES.SEQUENCE_UPDATE),
            })
            if (response?.code === "SUCCESS") {
                onSuccess(CALLBACK_CODES.SEQUENCE_UPDATE, response.code, response.message)
                sortConfigRef.current = ["seq", 1]
                setSequencing(false)
                getSubMastersList()
                setLoading(false)
            } else {
                onError(CALLBACK_CODES.SEQUENCE_UPDATE, response.code, response.message)
                setLoading(false)
            }
        } catch (error) {
            onError(CALLBACK_CODES.SEQUENCE_UPDATE, INTERNAL_ERROR_CODE, (error as Error).message)
            setLoading(false)
        }
    }
    const onImageUpload = async (file: File): Promise<{ fileUrl: string; fileId: string } | void> => {
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
                let responseData = response?.data[0] || response?.data
                return {
                    fileId: responseData?._id || responseData?.id,
                    fileUrl: build_path(baseUrl, responseData?.uri),
                }
            } else onError(CALLBACK_CODES.IMAGE_REMOVE, response.code, response.message)
        } catch (error) {
            onError(CALLBACK_CODES.IMAGE_REMOVE, INTERNAL_ERROR_CODE, (error as Error).message)
        }
    }
    const onImageRemove = async (id: string): Promise<void> => {
        try {
            let api = getApiType({ routes, action: "IMAGE_REMOVE", module: "masters", id })
            let response = await request({
                baseUrl,
                token,
                method: api.method,
                url: api.url,
                onError: handleError(CALLBACK_CODES.IMAGE_REMOVE),
            })
            if (response?.code === "SUCCESS") {
                onSuccess(CALLBACK_CODES.IMAGE_REMOVE, response.code, response.message)
            } else {
                onError(CALLBACK_CODES.IMAGE_REMOVE, response.code, response.message)
            }
        } catch (error) {
            onError(CALLBACK_CODES.IMAGE_REMOVE, INTERNAL_ERROR_CODE, (error as Error).message)
        }
    }
    const onSequenceToggle = (status: boolean): void => {
        setSequencing(status)
        sortConfigRef.current = ["seq", 1]
        getSubMastersList("", status)
    }
    useEffect(() => {
        if (selectedMaster) {
            setSequencing(false)
            getSubMastersList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, currentPage, selectedMaster])

    return {
        list,
        getSubMastersList,
        loading,
        setLoading,
        partialUpdate,
        onChangeSequence,
        sequencing,
        setSequencing: onSequenceToggle,
        onConfirmSequence,

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
        onImageRemove,
    }
}

export default useSubMaster
