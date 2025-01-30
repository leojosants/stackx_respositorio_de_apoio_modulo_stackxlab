"use strict";

import { cardData, clickData } from './database.js';


const parentCard = document.querySelector('[data-container-cards]');

const addAndRemoveClassActive = (target) => {
    const allFilters = document.querySelectorAll('[data-filter]');

    allFilters.forEach(
        (category) => category.classList.remove('c-active')
    );
    target.classList.add('c-active');
};

const showIndividualCard = (category) => {
    const allCards = document.querySelectorAll('[data-cards]');
    allCards.forEach(
        (card) => {
            const filteredCategoryIsIgualCardCategory = (card.dataset.category === category);

            if (filteredCategoryIsIgualCardCategory) {
                card.style.display = 'block';
                return;
            }
            card.style.display = 'none';
        }
    );
};

const loadIndividualCard = (cardId, localStorageKeyName, url) => {
    clickData[cardId]++;
    localStorage.setItem(localStorageKeyName, JSON.stringify(clickData));
    window.location.assign(url);
}

const addClass = (element, className) => {
    element.classList.add(className);
};

const removeClass = (element, className) => {
    element.classList.remove(className);
};


// filtro por categoria
window.addEventListener(
    'click', (event) => {
        const target = event.target;
        const filterCategory = target.dataset.filter;
        const allCards = document.querySelectorAll('[data-cards]');

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

                const template = document.querySelector("[data-template]").content;
                const cardItem = template.querySelector("[data-cards]").cloneNode(true);

                cardItem.dataset.category = data.category
                cardItem.dataset.id = data.id

                cardItem.querySelector("[data-card-img]").classList.add("c-post-img");
                cardItem.querySelector("[data-card-img]").src = data.banner.src;
                cardItem.querySelector("[data-card-img]").alt = data.banner.alt;
                cardItem.querySelector("[data-card-category]").textContent = data.display_category;
                cardItem.querySelector("[data-card-title]").textContent = data.title;
                cardItem.querySelector("[data-card-date-time]").textContent = `${data.date_time.date} - ${data.date_time.time}`;
                cardItem.querySelector("[data-card-views]").textContent = data.views;
                cardItem.querySelector("[data-card-description]").textContent = data.description;

                cardItem.addEventListener(
                    "click", () => {
                        const url = "/blog/assets/post-description/post.html";
                        const cardId = Number(cardItem.dataset.id);
                        const localStorageKeyName = "clickData";

                        window.localStorage.setItem('cardId', cardId);

                        switch (cardId) {
                            case 1:
                                loadIndividualCard(cardId, localStorageKeyName, url);
                                break;

                            case 2:
                                loadIndividualCard(cardId, localStorageKeyName, url);
                                break;

                            case 3:
                                loadIndividualCard(cardId, localStorageKeyName, url);
                                break;
                            case 4:
                                loadIndividualCard(cardId, localStorageKeyName, url);
                                break;

                            default:
                                break;
                        }
                    }
                );

                parentCard.appendChild(cardItem);
            }
        );
    }
);