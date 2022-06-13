import { useEffect, useState } from "react"

import { Input } from "components/Common"
import { useMasterState } from "context"

interface SearchInputProps {}

const MasterSearch = ({}: SearchInputProps) => {
  const { getMastersList } = useMasterState()
  const [search, setSearch] = useState<string>("")

  const onChangeSearch = (str: string) => {
    setSearch(str)
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      getMastersList(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <>
      <Input
        type="search"
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        placeholder="Search Masters"
      />
    </>
  )
}

export default MasterSearch
