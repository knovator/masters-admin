import React, { useRef, useState } from "react"
import { Input } from "../../../components/Common"
import { useMasterState } from "../../../context/MasterContext"

const MasterSearch = ({ onSearch }: SearchProps) => {
    const { setSearchStr, masterTranslations, setCurrentPage } = useMasterState()
    const callerRef = useRef<NodeJS.Timeout | null>(null)
    const [search, setSearch] = useState<string>("")

    const onChangeSearch = (str: string) => {
        setSearch(str)
        if (callerRef.current) clearTimeout(callerRef.current)

        callerRef.current = setTimeout(() => {
            setSearchStr(str)
            setCurrentPage(1)
            if (onSearch) onSearch(str)
        }, 300)
    }

    return (
        <Input.SearchInput
            type="search"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder={masterTranslations.searchMaster}
        />
    )
}

export default MasterSearch
