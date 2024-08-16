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


const allCards = document.querySelectorAll('[data-cards]');
const allViews = document.querySelectorAll('[data-views]');
const allFilters = document.querySelectorAll('[data-filter]');


// funcoes
const addAndRemoveClassActive = (target) => {
    allFilters.forEach(
        (category) => category.classList.remove('class-active')
    );
    target.classList.add('class-active');
};

const showIndividualCard = (category) => {
    allCards.forEach(
        (card) => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            }
            else {
                card.style.display = 'none';
            }
        }
    );
};


// filtro por categoria
window.addEventListener(
    'click', (event) => {
        const target = event.target;
        const filterCategory = target.getAttribute('data-filter');

        switch (filterCategory) {
            case 'all-categories':
                addAndRemoveClassActive(target);
                allCards.forEach((card) => card.style.display = 'block');
                parentCard.classList.remove('class-individual-card');
                break;

            case 'category-1':
                addAndRemoveClassActive(target);
                showIndividualCard('category_1');
                parentCard.classList.add('class-individual-card');
                break;

            case 'category-2':
                addAndRemoveClassActive(target); showIndividualCard('category_2');
                parentCard.classList.add('class-individual-card');
                break;
            case 'category-3':
                addAndRemoveClassActive(target);
                showIndividualCard('category_3');
                parentCard.classList.add('class-individual-card');
                break;

            case 'category-4':
                addAndRemoveClassActive(target);
                showIndividualCard('category_4');
                parentCard.classList.add('class-individual-card');
                break;

            default:
                break;
        }
    }
);


// selecao de card individual
allCards.forEach(
    (card, indice) => {
        card.addEventListener('click', () => {
            const cardAttributeId = Number(card.getAttribute('data-id'));

            switch (cardAttributeId) {
                case 1:
                    allViews.forEach((view, indice) => {
                        if ((indice + 1) === cardAttributeId) {
                            view.innerHTML = Number(view.innerHTML) + 1;
                            window.localStorage.setItem('views_card_1', view.innerHTML);
                            window.location.assign('/blog/assets/post-description/post.html');
                            return;
                        }
                    });
                    break;

                case 2:
                    break;

                case 3:
                    break;

                case 4:
                    break;

                default:
                    break;
            }
        });
    }
);