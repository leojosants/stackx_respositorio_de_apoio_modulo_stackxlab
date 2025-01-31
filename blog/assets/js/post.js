"use strict";

import { getItemLocalStorage } from '../utils/get-item-local-storage.js';

import { cardData } from './database.js';


(
    () => {
        window.addEventListener(
            "DOMContentLoaded", () => {
                const convertStringToNumber = (data) => {
                    return Number(data);
                };

                const onClickButtonLogin = () => {
                    alert("Opção indisponível no momento.");
                };

                const createCard = (data) => {
                    const template = window.document.querySelector("[data-template-post-description]").content;
                    const cardItem = template.querySelector("[data-post]").cloneNode(true);

                    cardItem
                        .querySelector("[data-post-title]")
                        .textContent = data.title;

                    cardItem
                        .querySelector("[data-post-header-img]")
                        .src = data.banner.src;

                    cardItem
                        .querySelector("[data-post-header-img]")
                        .alt = data.banner.alt;

                    cardItem
                        .querySelector("[data-post-date-time]")
                        .textContent = `${data.date_time.date} ${data.date_time.time}`;

                    cardItem
                        .querySelector("[data-post-views]")
                        .textContent = data.views;

                    cardItem
                        .querySelector("[data-post-text]")
                        .textContent = data.description;

                    return cardItem;
                };

                const cardId = convertStringToNumber(getItemLocalStorage('cardId'));
                const loginButton = window.document.querySelector('[data-login]');

                loginButton.addEventListener(
                    "click", onClickButtonLogin
                );

                cardData.forEach(
                    (data) => {
                        if (data.id === cardId) {
                            const newCard = createCard(data);
                            const mainContainer = window.document.querySelector("[data-main-container]");
                            mainContainer.appendChild(newCard);
                        }
                    }
                );
            }
        );
    }
)();