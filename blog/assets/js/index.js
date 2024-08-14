import { card_data } from './database.js';

const parentCard = document.querySelector('[data-container-cards]');

// criando cards
card_data.map(
    (data) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('class-post-box');
        cardElement.setAttribute('data-cards', '');
        cardElement.setAttribute('data-category', data.category);
        cardElement.setAttribute('data-id', data.id);

        cardElement.innerHTML = `
            <img class="class-post-img" src="${data.banner.src}">
            
            <h2 class="class-category">
                ${data.display_category}
            </h2>
            
            <p class="class-post-title">
                ${data.title}
            </p>

            <span class="class-post-date" data-date>
                ${data.date_time.date} - ${data.date_time.time}
            </span>

            <br />

            <span class="class-category">
                Visualizações: <span data-views>${data.views}</span>
            </span>

            <p class="class-post-description">
                ${data.description}
            </p>
        `;

        parentCard.appendChild(cardElement);
    }
);