import { getItemLocalStorage } from "./get-item-local-storage.js";


export let clickData = JSON.parse(getItemLocalStorage("clickData")) || {};