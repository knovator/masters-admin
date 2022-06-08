const LocalStorage = {
  get: (key: string) => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(key)
    }

    return false
  },

  getJSON: (key: string) => {
    if (typeof localStorage !== "undefined") {
      const data = LocalStorage.get(key)

      return data && data !== "undefined" ? data : ""
    }

    return false
  },

  set: (...rest: any) => {
    if (typeof localStorage !== "undefined") {
      return localStorage.setItem.apply(null, rest)
    }

    return false
  },

  setJSON: (key: string, value: string) => {
    if (typeof localStorage !== "undefined") {
      const data = JSON.stringify(value)

      return LocalStorage.set(key, data)
    }

    return false
  },

  setToken: (token: string) => {
    LocalStorage.set("token", token)
  },

  setUser: (user: any) => {
    LocalStorage.set("user", JSON.stringify(user))
  },

  remove: (key: any) => {
    if (typeof localStorage !== "undefined") {
      return localStorage.removeItem(key)
    }

    return false
  },

  clean: (key: string) => {
    if (typeof localStorage !== "undefined") {
      return localStorage.clear()
    }

    return false
  },
}

const getToken = () => LocalStorage.get("token")

export { getToken, LocalStorage }
