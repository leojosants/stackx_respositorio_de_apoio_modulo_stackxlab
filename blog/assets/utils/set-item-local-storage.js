export const setItemLocalStorage = (localStorageKeyName, data) => {
    window.localStorage.setItem(localStorageKeyName, data);
};