const PREFIX = 'gabor_juhasz_ICF_'

const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem('test', 'test')
    localStorage.removeItem('test')
    return true
  } catch (e) {
    return false
  }
}

export const persist = (key, value) => {
  if (!isLocalStorageAvailable()) return

  localStorage.setItem(`${PREFIX}${key}`, value)
}

export const persistObject = (key, value) => {
  persist(key, JSON.stringify(value))
}

export const load = (key, defaultValue) => {
  if (!isLocalStorageAvailable()) return defaultValue

  const value = localStorage.getItem(`${PREFIX}${key}`)
  if (null === value) return defaultValue

  return value
}

export const loadObject = (key, defaultValue) => {
  const raw = load(key, defaultValue)

  try {
    return JSON.parse(raw)
  } catch (e) {
    return defaultValue
  }
}
