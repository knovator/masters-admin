import { useRef } from "react"
import * as constants from "../constants/common"

interface UsePaginationProps {
    defaultLimit?: number
}

const usePagination = ({ defaultLimit }: UsePaginationProps) => {
    const offsetRef = useRef<number>(constants.DEFAULT_OFFSET_PAYLOAD)
    const limitRef = useRef<number>(defaultLimit || constants.DEFAULT_LIMIT)
    const currentPageRef = useRef<number>(constants.DEFAULT_CURRENT_PAGE)
    const tempLimitRef = useRef<number>(constants.DEFAULT_OFFSET_PAYLOAD)
    const searchRef = useRef<string>("")

    const setTempLimit = (value: number) => {
        tempLimitRef.current = value
    }

    const setPageSize = (value: number) => {
        limitRef.current = Number.parseInt(String(value), constants.DECIMAL_REDIX)
        offsetRef.current = constants.DEFAULT_OFFSET_PAYLOAD
        currentPageRef.current = constants.DEFAULT_CURRENT_PAGE
    }

    const changeCurrentPage = (value: number) => {
        offsetRef.current = Math.max(value - 1, 1) * limitRef.current
        currentPageRef.current = constants.DEFAULT_CURRENT_PAGE
    }

    const setSearchStr = (value: string) => (searchRef.current = value)

    return {
        tempSize: tempLimitRef.current,
        setTempSize: setTempLimit,
        pageSize: limitRef.current,
        offset: offsetRef.current,
        offsetRef,
        limitRef,
        tempLimitRef,
        currentPageRef,
        searchRef,
        setPageSize,
        currentPage: currentPageRef.current,
        setCurrentPage: changeCurrentPage,
        searchStr: searchRef.current,
        setSearchStr: setSearchStr,
    }
}

export default usePagination
