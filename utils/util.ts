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
