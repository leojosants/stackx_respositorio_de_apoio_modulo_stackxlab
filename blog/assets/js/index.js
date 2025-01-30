"use strict";

import { setItemLocalStorage } from '../utils/set-item-local-storage.js';
import { clickData } from '../utils/get-local-storage-click-data.js';

import { cardData } from './database.js';


(
    () => {
        const addAndRemoveClassActive = (target) => {
            const allFilters = querySelectorAllFn('[data-filter]');

            allFilters.forEach(
                (category) => removeClass(category, 'c-active')
            );

            addClass(target, 'c-active');
        };

        const showIndividualCard = (category) => {
            const allCards = querySelectorAllFn('[data-cards]');

            allCards.forEach(
                (card) => {
                    const filteredCategoryIsIgualCardCategory = (card.dataset.category === category);

                    if (filteredCategoryIsIgualCardCategory) {
                        changeStyleDisplay(card, 'block');
                        return;
                    }

                    changeStyleDisplay(card, 'none');
                }
            );
        };

        const loadIndividualCard = (cardId, localStorageKeyName, url) => {
            clickData[cardId]++;
            setItemLocalStorage(localStorageKeyName, JSON.stringify(clickData));
            window.location.assign(url);
        }

        const addClass = (element, className) => {
            element.classList.add(className);
        };

        const removeClass = (element, className) => {
            element.classList.remove(className);
        };

        const changeStyleDisplay = (element, value) => {
            element.style.display = value;
        };

        const querySelectorAllFn = (identification) => {
            return document.querySelectorAll(identification);
        };

        const querySelectorFn = (identification) => {
            return document.querySelector(identification);
        };

        const convertStringToNumber = (data) => {
            return Number(data);
        };

        const createCard = (data) => {
            const template = document.querySelector("[data-template]").content;
            const cardItem = template.querySelector("[data-cards]").cloneNode(true);

            cardItem.dataset.category = data.category
            cardItem.dataset.id = data.id

            cardItem
                .querySelector("[data-card-img]")
                .classList
                .add("c-post-img");

            cardItem
                .querySelector("[data-card-img]")
                .setAttribute("src", data.banner.src);

            cardItem
                .querySelector("[data-card-img]")
                .setAttribute("alt", data.banner.alt);

            cardItem
                .querySelector("[data-card-category]")
                .textContent = data.display_category;

            cardItem
                .querySelector("[data-card-title]")
                .textContent = data.title;

            cardItem
                .querySelector("[data-card-date-time]")
                .textContent = `${data.date_time.date} - ${data.date_time.time}`;

            cardItem
                .querySelector("[data-card-views]")
                .textContent = data.views;

            cardItem
                .querySelector("[data-card-description]")
                .textContent = data.description;

            cardItem.addEventListener(
                "click", () => {
                    const url = "/blog/assets/post-description/post.html";
                    const cardId = convertStringToNumber(cardItem.dataset.id);

                    setItemLocalStorage('cardId', cardId);

                    switch (cardId) {
                        case 1:
                            loadIndividualCard(cardId, "clickData", url);
                            break;

                        case 2:
                            loadIndividualCard(cardId, "clickData", url);
                            break;

                        case 3:
                            loadIndividualCard(cardId, "clickData", url);
                            break;
                        case 4:
                            loadIndividualCard(cardId, "clickData", url);
                            break;

                        default:
                            break;
                    }
                }
            );

            return cardItem;
        };

        const onClickButtonLogin = () => {
            alert("Opção indisponível no momento.");
        };

        window.addEventListener(
            'click', (event) => {
                const target = event.target;
                const filterCategory = target.dataset.filter;
                const buttonLogin = target.dataset.button;
                const allCards = querySelectorAllFn('[data-cards]');
                const parentCard = querySelectorFn('[data-container-cards]');

                if (buttonLogin === "login") {
                    onClickButtonLogin();
                }

                switch (filterCategory) {
                    case 'all-categories':
                        addAndRemoveClassActive(target);
                        allCards.forEach((card) => card.style.display = 'block');
                        removeClass(parentCard, 'c-individual-card');
                        break;

                    case 'category-1':
                        addAndRemoveClassActive(target);
                        showIndividualCard('category_1');
                        addClass(parentCard, 'c-individual-card');
                        break;

                    case 'category-2':
                        addAndRemoveClassActive(target);
                        showIndividualCard('category_2');
                        addClass(parentCard, 'c-individual-card');
                        break;

                    case 'category-3':
                        addAndRemoveClassActive(target);
                        showIndividualCard('category_3');
                        addClass(parentCard, 'c-individual-card');
                        break;

                    case 'category-4':
                        addAndRemoveClassActive(target);
                        showIndividualCard('category_4');
                        addClass(parentCard, 'c-individual-card');
                        break;

                    default:
                        break;
                }
            }
        );

        // criando cards
        window.addEventListener(
            "DOMContentLoaded", () => {
                cardData.map(
                    (data) => {
                        if (!clickData[data.id]) {
                            clickData[data.id] = 0;
                        }

                        const newCard = createCard(data);
                        const parentCard = querySelectorFn('[data-container-cards]');

                        parentCard.appendChild(newCard);
                    }
                );
            }
        );
    }
)();