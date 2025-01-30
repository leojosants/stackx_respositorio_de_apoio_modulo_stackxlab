export const getItemLocalStorage = (localStorageKeyName, data) => {
    return window.localStorage.getItem(localStorageKeyName, data);
};