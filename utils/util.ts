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
    ?.replace(" ", "_")