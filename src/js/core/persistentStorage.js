export function saveData(key, data) {
    sessionStorage.setItem(key, data)
}

export function delData(key) {
    sessionStorage.removeItem(key)
}

export function getData(key) {
    return sessionStorage.getItem(key)
}
