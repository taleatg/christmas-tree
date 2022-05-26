import {
    data,
    Card,
    card,
    InfoAboutCard,
    currentCards,
    inputSearch,
    inputSearchWrap,
} from '../constants';

export class Search {
    private card: Card;

    constructor() {
        this.card = card;
    }

    searchToys() {
        const cross = document.createElement('button') as HTMLElement;
        inputSearch.addEventListener('input', () => {
            this.startSearch();
            if (inputSearchWrap.lastChild === cross) {
                return;
            }

            inputSearch.classList.add('search-active');
            cross.classList.add('search-button');
            inputSearchWrap.appendChild(cross);
        });

        inputSearch.onfocus = () => {
            inputSearch.classList.remove('search-active');
            cross.remove();
        };

        cross.addEventListener('click', () => {
            inputSearch.value = '';
            inputSearch.focus();
            this.startSearch();
        });
    }

    startSearch() {
        const card = document.querySelectorAll('.card');
        const newData = currentCards.length ? currentCards : data;
        const resultAfterSearch: InfoAboutCard[] = [];

        newData.forEach((item) => {
            if (item.name.toLowerCase().indexOf(inputSearch.value.toLowerCase()) !== -1) {
                resultAfterSearch.push(item);
            }
        });

        card.forEach((item) => item.remove());
        this.card.giveCardContent(resultAfterSearch);
    }
}
