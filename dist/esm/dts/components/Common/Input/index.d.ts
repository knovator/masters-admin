/// <reference types="react" />
import Checkbox from "./Checkbox";
import Select from "./Select";
import Textarea from "./Textarea";
declare const _default: (({ onChange, onInput, disabled, value, type, placeholder, rest, label, error, className, }: import("./Input").InputProps) => JSX.Element) & {
    Textarea: typeof Textarea;
    Checkbox: typeof Checkbox;
    Select: typeof Select;
};
export default _default;
