import { clickData } from "./get-local-storage-click-data.js";


export const getLocalStorageViews = (id) => {
    return clickData[id] === undefined ? 0 : clickData[id];
};