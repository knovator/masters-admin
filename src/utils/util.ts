export const debounce = (callback: (param?: any) => void, wait = 1000) => {
    let timeout: NodeJS.Timeout

    return function executedFunction(...parameters: any) {
        const later = () => {
            clearTimeout(timeout)
            callback(...parameters)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export const capitalizeFirstLetter = (string = "") => `${string?.charAt(0)?.toUpperCase()}${string?.slice(1)}`

export const changeToCode = (string = "") =>
    string
        .replace(/[^\s\w]/gi, "")
        ?.toUpperCase()
        ?.replace(/ /g, "_")

export const isObject = (data: any) => data?.constructor?.name === "Object"
export const isString = (data: any) => data?.constructor?.name === "String"
export const isArray = (data: any) => data?.constructor?.name === "Array"

export const isEmpty = (data: any) => {
    if (isObject(data)) return Object.keys(data).length === 0
    if (isArray(data)) return data.length === 0
    if (isString(data)) return !data || data.length === 0
    if ([undefined, null, ""].includes(data)) return true
    return false
}

export const build_path = (...args: string[]) => {
    return args
        .map((part, i) => {
            if (i === 0) {
                return part.trim().replace(/[\/]*$/g, "")
            } else {
                return part.trim().replace(/(^[\/]*|[\/]*$)/g, "")
            }
        })
        .filter((x) => x.length)
        .join("/")
}