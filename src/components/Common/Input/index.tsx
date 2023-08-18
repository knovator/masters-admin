import Checkbox from "./Checkbox"
import Input from "./Input"
import Select from "./Select"
import Textarea from "./Textarea"
import SearchInput from "./SearchInput"

export default Object.assign<
    typeof Input,
    { Textarea: typeof Textarea; Checkbox: typeof Checkbox; Select: typeof Select; SearchInput: typeof SearchInput }
>(Input, { Textarea, Select, Checkbox, SearchInput })
