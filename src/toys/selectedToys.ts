import {
    data,
    ArrCards,
    Card,
    TotalFilters,
    mainPage,
    countSelectedShow,
    amountSelectedToys,
    savedSelectedToys,
    InfoAboutCard,
    card,
    totalFilters,
} from '../constants';

const amountSelectedToysInLocal = localStorage.getItem('total selected toys') || 0;
let amountSelected: number = +amountSelectedToysInLocal;
const MAX_SELECTED = 20;
const MIN_SELECTED = 0;
let isShowOnlySelected = false;

export class Selected {
    private card: Card;
    private totalFilters: TotalFilters;

    constructor() {
        this.card = card;
        this.totalFilters = totalFilters;
    }

    showSelected(cards: string, isDeleteInSelected: boolean): void {
        const sticker = document.querySelectorAll('.sticker');
        const numCard: ArrCards[] = document.querySelectorAll('.num-card') as unknown as ArrCards[];

        if (amountSelected < MAX_SELECTED) {
            if (isDeleteInSelected) {
                amountSelected--;
                amountSelected < MIN_SELECTED ? (amountSelected = MIN_SELECTED) : amountSelected;
                numCard.forEach((item, index) => {
                    if (item.outerText === cards) {
                        sticker[index].classList.remove('sticker-favorite');
                    }
                });
            } else {
                amountSelected++;
                numCard.forEach((item, index) => {
                    if (item.outerText === cards) {
                        sticker[index].classList.add('sticker-favorite');
                    }
                });
            }
        } else {
            if (isDeleteInSelected) {
                amountSelected--;
                sticker[+cards - 1].classList.remove('sticker-favorite');
            }
        }

        countSelectedShow.textContent = amountSelected.toString();
        localStorage.setItem('total selected toys', amountSelected.toString());
    }

    showModalWindow(positionX: number, positionY: number) {
        const height: number = document.documentElement.scrollHeight;
        const width: number = document.documentElement.scrollWidth;
        const message = document.createElement('div');
        const textMessage = document.createElement('p');
        const WIDTH_MESSAGE = 350;
        const HEIGHT_MESSAGE = 250;

        message.classList.add('message');
        textMessage.classList.add('text-message');
        textMessage.textContent = 'Извините, все слоты заполнены';
        textMessage.style.left = width - positionX < WIDTH_MESSAGE ? `${width - WIDTH_MESSAGE}px` : `${positionX}px`;
        textMessage.style.top = height - positionY < HEIGHT_MESSAGE ? `${height - HEIGHT_MESSAGE}px` : `${positionY}px`;

        mainPage.appendChild(message);
        message.appendChild(textMessage);

        message.addEventListener('click', () => {
            message.remove();
        });
    }

    addStickerToFavorites() {
        const numToysInLocal = localStorage.getItem('selected toys');

        const numCard: ArrCards[] = document.querySelectorAll('.num-card') as unknown as ArrCards[];
        const sticker = document.querySelectorAll('.sticker');

        if (numToysInLocal) {
            const arrToysInLocal = JSON.parse(numToysInLocal) as string[];

            for (let i = 0; i < arrToysInLocal.length; i++) {
                numCard.forEach((item, index) => {
                    if (item.outerText === arrToysInLocal[i]) {
                        sticker[index].classList.add('sticker-favorite');
                    }
                });
            }

            amountSelectedToys.textContent = amountSelected.toString();
        }
    }

    resetSelected() {
        const sticker = document.querySelectorAll('.sticker');
        const countSelectedShow = <HTMLDivElement>document.querySelector('.total-favorite');

        sticker.forEach((item) => {
            item.classList.remove('sticker-favorite');
        });

        countSelectedShow.textContent = '0';
        amountSelected = MIN_SELECTED;
        localStorage.setItem('selected toys', JSON.stringify([]));
    }

    showOnlySelected () {
        const ball = document.querySelector('.ball') as HTMLElement;

        const showSelected = () => {
            const card = document.querySelectorAll('.card');
            const newData: InfoAboutCard[] = [];
            isShowOnlySelected = true;

            data.forEach((item) => {
                savedSelectedToys.forEach(num => {
                    if (item.num === num) {
                        newData.push(item);
                    }
                })
            })

            card.forEach((item) => item.remove());
            this.card.giveCardContent(newData);
            ball.classList.add('active-ball');
        }

        const hideSelected = () => {
            const card = document.querySelectorAll('.card');
            card.forEach((item) => item.remove());
            isShowOnlySelected = false;
            this.totalFilters.createNewData();
            ball.classList.remove('active-ball');
        }

        ball.addEventListener('click', () => {
            !isShowOnlySelected ? showSelected() : hideSelected();
        })
    }
}
