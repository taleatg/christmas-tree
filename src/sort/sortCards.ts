import {
    data,
    Card,
    InfoAboutCard,
    numCards,
    isLocalReset,
    sortSelect,
} from '../constants';

export type ArrCards = {
    outerText: string;
};

enum sortType {
    sortByNameTop = 1,
    sortByNameBottom = 2,
    sortByCountMax = 3,
    sortByCountMin = 4,
}

const IND_CARD = 1;
const START_IND_OPTION = 0;
const DIFF_NUM_AND_IND_OPTION = 1;

export class Sort {
    private card: Card;

    constructor() {
        this.card = new Card();
    }

    chooseSort() {
        const option = sortSelect.options;
        const typeInLocal = localStorage.getItem('sort type');

        const typeSort = (type: number) => {
            if (type === sortType.sortByNameTop) {
                this.sortByName('top');
            } else if (type === sortType.sortByNameBottom) {
                this.sortByName('bottom');
            } else if (type === sortType.sortByCountMax) {
                this.sortByCount('max');
            } else if (type === sortType.sortByCountMin) {
                this.sortByCount('min');
            }
        };

        if (typeInLocal) {
            const arrTypeInLocal = JSON.parse(typeInLocal) as (number | string)[];
            for (let i = 0; i < arrTypeInLocal.length; i++) {
                if (arrTypeInLocal[i] !== 0) {
                    typeSort(i + DIFF_NUM_AND_IND_OPTION);
                    sortSelect.options[i + DIFF_NUM_AND_IND_OPTION].selected = true;
                }
            }
        }

        sortSelect.onchange = () => typeSort(option.selectedIndex);
        if (isLocalReset) {
            option.selectedIndex = START_IND_OPTION;
        }
    }

    sortByName(arg: string) {
        const arrCards: ArrCards[] = document.querySelectorAll('.title-card') as unknown as ArrCards[];
        const arrTitleCards = [];

        for (let i = 0; i < arrCards.length; i++) {
            arrTitleCards.push([arrCards[i].outerText, numCards[i] - 1]);
        }

        const sortByNameTop = function (arrTitleCards: (string | number)[][]) {
            arrTitleCards.sort((a, b) => (a > b ? 1 : -1));
            localStorage.setItem('sort type', JSON.stringify(['sortByNameTop', 0, 0, 0]));
        };

        const sortByNameBottom = function (arrTitleCards: (string | number)[][]) {
            arrTitleCards.sort((a, b) => (a > b ? -1 : 1));
            localStorage.setItem('sort type', JSON.stringify([0, 'sortByNameBottom', 0, 0]));
        };

        arg === 'top' ? sortByNameTop(arrTitleCards) : sortByNameBottom(arrTitleCards);

        this.moveCards(arrTitleCards, IND_CARD);
    }

    sortByCount(arg: string) {
        const arrCards: ArrCards[] = document.querySelectorAll('.buyYear') as unknown as ArrCards[];
        const arrCountCards = [];

        for (let i = 0; i < arrCards.length; i++) {
            arrCountCards.push([arrCards[i].outerText, numCards[i] - 1]);
        }

        const sortByCountMax = function (arrCountCards: (string | number)[][]) {
            arrCountCards.sort((a, b) => +a[0] - +b[0]);
            localStorage.setItem('sort type', JSON.stringify([0, 0, 'sortByCountMax', 0]));
        };

        const sortByCountMin = function (arrCountCards: (string | number)[][]) {
            arrCountCards.sort((a, b) => +b[0] - +a[0]);
            localStorage.setItem('sort type', JSON.stringify([0, 0, 0, 'sortByCountMin']));
        };

        arg === 'min' ? sortByCountMin(arrCountCards) : sortByCountMax(arrCountCards);

        this.moveCards(arrCountCards, IND_CARD);
    }

    moveCards(arrCountCards: (string | number)[][], IND_CARD: number) {
        const card = document.querySelectorAll('.card');
        const newData: InfoAboutCard[] = [];

        for (let i = 0; i < arrCountCards.length; i++) {
            const num = arrCountCards[i][IND_CARD] as number;
            newData.push(data[num]);
        }

        card.forEach((item) => item.remove());
        this.card.giveCardContent(newData);
    }
}
