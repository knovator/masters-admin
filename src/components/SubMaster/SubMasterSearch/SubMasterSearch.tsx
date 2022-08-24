import React, { useRef, useState } from "react"
import { Input } from "../../../components/Common"
import { useSubMasterState } from "../../../context/SubMasterContext"

const SubMasterSearch = () => {
    const { getSubMastersList, t } = useSubMasterState()
    const callerRef = useRef<NodeJS.Timeout | null>(null)
    const [search, setSearch] = useState<string>("")

    const onChangeSearch = (str: string) => {
        setSearch(str)
        if (callerRef.current) clearTimeout(callerRef.current)

        callerRef.current = setTimeout(() => {
            getSubMastersList(str)
        }, 300)
    }

    return (
        <Input
            type="search"
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder={t("searchSubMasters")}
        />
    )
}

export default SubMasterSearch
