"use strict";

import { cardData } from './database.js';


const postTitle = document.querySelector(
    '[data-post-title]'
);

const postHeaderImg = document.querySelector(
    '[data-post-header-img]'
);

const postDate = document.querySelector(
    '[data-post-date]'
);

const postViews = document.querySelector(
    '[data-post-views]'
);
const postText = document.querySelector(
    '[data-post-text]'
);


const cardId = Number(window.localStorage.getItem('cardId'));


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