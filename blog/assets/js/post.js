"use strict";

import { getItemLocalStorage } from '../utils/get-item-local-storage.js';

import { cardData } from './database.js';


(
    () => {
        window.addEventListener(
            "DOMContentLoaded", () => {
                const querySelectorFn = (identification) => {
                    return document.querySelector(identification);
                };

                const convertStringToNumber = (data) => {
                    return Number(data);
                };

                const postTitle = querySelectorFn('[data-post-title]');
                const postHeaderImg = querySelectorFn('[data-post-header-img]');
                const postDate = querySelectorFn('[data-post-date]');
                const postViews = querySelectorFn('[data-post-views]');
                const postText = querySelectorFn('[data-post-text]');

                const cardId = convertStringToNumber(getItemLocalStorage('cardId'));

                cardData.forEach(
                    (data) => {
                        if (data.id === cardId) {
                            postTitle.innerHTML = data.title;
                            postHeaderImg.src = data.banner.src
                            postHeaderImg.alt = data.banner.alt
                            postDate.innerHTML = `${data.date_time.date} ${data.date_time.time}`;
                            postViews.innerHTML = data.views;
                            postText.innerHTML = data.description;
                        }
                    }
                );
            }
        );
    }
)();