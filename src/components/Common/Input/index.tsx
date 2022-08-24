import Checkbox from "./Checkbox"
import Input from "./Input"
import Select from "./Select"
import Textarea from "./Textarea"

export default Object.assign<
    typeof Input,
    { Textarea: typeof Textarea; Checkbox: typeof Checkbox; Select: typeof Select }
>(Input, { Textarea, Select, Checkbox })
