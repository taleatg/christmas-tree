import {
    Selected,
    messageAfterFiltering,
} from '../constants';

export interface InfoAboutCard {
    num: string;
    name: string;
    count: string;
    year: string;
    shape: string;
    color: string;
    size: string;
    favorite: string;
}

export let numCards: number[] = [];

const infoAboutToy = [
    {info: 'Количество', value: 'count' },
    {info: 'Год покупки:', value: 'year' },
    {info: 'Форма:', value: 'shape' },
    {info: 'Цвет:', value: 'color' },
    {info: 'Размер:', value: 'size' },
    {info: 'Любимая:', value: 'favorite' },
]
export let savedSelectedToys: string[] = [];
const TIMER_FOR_SHOW_CARDS = 100;
const MAX_AMOUNT_SELECTED_CARD = 20;

export class Card {
    private selected: Selected;

    constructor() {
        this.selected = new Selected();
    }

    giveCardContent(data: InfoAboutCard[]) {
        const chosenToys = localStorage.getItem('selected toys') as string;
        numCards = [];

        if (chosenToys) {
            savedSelectedToys = JSON.parse(chosenToys) as string[];
        }
        !data.length ? messageAfterFiltering.classList.remove('message-hide') : messageAfterFiltering.classList.add('message-hide');

        for (let i = 0; i < data.length; i++) {
            const allCardsWrap = <HTMLDivElement>document.querySelector('.toy-card-wrap');
            const oneCardDiv = document.createElement('div');
            const numCard = document.createElement('div');
            const titleCard = document.createElement('h2');
            const infoAboutToy = document.createElement('div');
            const pictureToys = document.createElement('div');
            const cardInfo = document.createElement('div');
            const sticker = document.createElement('div');

            oneCardDiv.classList.add('card');
            allCardsWrap.appendChild(oneCardDiv);

            setTimeout(() => {
                oneCardDiv.classList.add('show-card');
            }, TIMER_FOR_SHOW_CARDS);

            numCard.textContent = data[i].num;
            numCard.classList.add('num-card');
            oneCardDiv.appendChild(numCard);

            titleCard.textContent = data[i].name;
            titleCard.classList.add('title-card');
            oneCardDiv.appendChild(titleCard);

            pictureToys.classList.add('picture-toys');
            pictureToys.style.background = `url('./assets/toys/${data[i].num}.webp') center no-repeat`;
            pictureToys.style.backgroundSize = 'contain';
            infoAboutToy.classList.add('info-about-toy');
            oneCardDiv.appendChild(infoAboutToy);
            infoAboutToy.appendChild(pictureToys);
            infoAboutToy.appendChild(cardInfo);

            sticker.classList.add('sticker');
            oneCardDiv.appendChild(sticker);

            setTimeout(() => {
                this.selected.addStickerToFavorites();
            }, 0);

            this.fillOutTheCard(data, cardInfo, i);
            this.clickOnCard(oneCardDiv, data, cardInfo, i);
            numCards.push(+data[i].num);
        }
    }

    fillOutTheCard(data: InfoAboutCard[], cardInfo: HTMLElement, index: number) {
        infoAboutToy.forEach((item, j) => {
            const textInfo = document.createElement('p');
            const value = document.createElement('p');

            cardInfo.classList.add('card-info');
            textInfo.classList.add('text-info');
            textInfo.textContent = item.info;
            value.classList.add('value');

            switch (infoAboutToy[j].value) {
                case 'count':
                    value.textContent = data[index].count;
                    break;
                case 'year':
                    value.textContent = data[index].year;
                    value.classList.add('buyYear');
                    break;
                case 'shape':
                    value.textContent = data[index].shape;
                    value.classList.add('type-shape');
                    break;
                case 'color':
                    value.textContent = data[index].color;
                    value.classList.add('type-color');
                    break;
                case 'size':
                    value.textContent = data[index].size;
                    value.classList.add('type-size');
                    break;
                case 'favorite':
                    value.textContent = data[index].favorite;
                    value.classList.add('is-favorite');
                    break;
            }

            cardInfo.appendChild(textInfo);
            textInfo.appendChild(value);
        });
    }

    clickOnCard(oneCardDiv: HTMLElement, data: InfoAboutCard[], cardInfo: HTMLElement, index: number) {
        oneCardDiv.addEventListener('click', (e: { clientX: number; clientY: number }) => {
            const positionX = e.clientX;
            const positionY = window.pageYOffset + e.clientY;
            const indSelectedToy: number = savedSelectedToys.indexOf(data[index].num);
            let isDeleteInSelected: boolean;

            if (indSelectedToy === -1) {
                savedSelectedToys.length < MAX_AMOUNT_SELECTED_CARD
                    ? savedSelectedToys.push(data[index].num)
                    : this.selected.showModalWindow(positionX, positionY);
                isDeleteInSelected = false;
            } else {
                savedSelectedToys.splice(indSelectedToy, 1);
                isDeleteInSelected = true;
            }

            localStorage.setItem('selected toys', JSON.stringify(savedSelectedToys));
            this.selected.showSelected(data[index].num, isDeleteInSelected);
        });
    }
}
