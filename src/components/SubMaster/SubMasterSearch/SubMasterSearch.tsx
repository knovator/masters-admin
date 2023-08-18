import React, { useEffect, useRef, useState } from "react"
import { Input } from "../../../components/Common"
import { useProviderState } from "../../../context/ProviderContext"
import { useSubMasterState } from "../../../context/SubMasterContext"

const SubMasterSearch = () => {
    const { selectedMaster } = useProviderState()
    const { setSearchStr, t, setCurrentPage } = useSubMasterState()
    const callerRef = useRef<NodeJS.Timeout | null>(null)
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        setSearch("")
    }, [selectedMaster])

    const onChangeSearch = (str: string) => {
        setSearch(str)
        if (callerRef.current) clearTimeout(callerRef.current)

        callerRef.current = setTimeout(() => {
            // setCurrentPage internally calls getSubMastersList
            setSearchStr(str)
            setCurrentPage(1)
        }, 300)
    }

    return (
        <Input.SearchInput
            type="search"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder={t("searchSubMasters")}
        />
    )
}

export default SubMasterSearch
