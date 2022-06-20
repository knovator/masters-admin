import { Input } from "components/Common"
import { useMasterState } from "context/MasterContext"
import { useRef, useState } from "react"

const MasterSearch = () => {
  const { getMastersList } = useMasterState()
  const callerRef = useRef<NodeJS.Timeout | null>(null)
  const [search, setSearch] = useState<string>("")

  const onChangeSearch = (str: string) => {
    setSearch(str)
    if (callerRef.current) clearTimeout(callerRef.current)

    callerRef.current = setTimeout(() => {
      getMastersList(str)
    }, 300)
  }

  return (
    <Input type="search" value={search} onChange={(e) => onChangeSearch(e.target.value)} placeholder="Search Masters" />
  )
}

export default MasterSearch
