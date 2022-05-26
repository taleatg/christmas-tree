import {
    data,
    Card,
    InfoAboutCard,
    Sort,
} from '../constants';

export let currentCards: InfoAboutCard[] = [];
enum TypeFilter {
    size = 0,
    shape = 1,
    color = 2,
    amount = 3,
    year = 4,
}

const IND_START = 0;
const IND_END = 1;

export class TotalFilters {
    private card: Card;
    private sort: Sort;

    constructor() {
        this.card = new Card();
        this.sort = new Sort();
    }

    createNewData() {
        const favoriteInLocal = !!JSON.parse(<string>localStorage.getItem('favorite'));
        const sizeInLocal = localStorage.getItem('type size') || '';
        const shapeInLocal = localStorage.getItem('type shape') || '';
        const colorInLocal = localStorage.getItem('type color') || '';
        const amountInLocal = localStorage.getItem('slider amount') || '';
        const yearInLocal = localStorage.getItem('slider year') || '';
        const arrSizeInLocalType: string[] = [];
        const arrShapeInLocalType: string[] = [];
        const arrColorInLocalType: string[] = [];
        const arrAmountInLocalType: string[] = [];
        const arrYearInLocalType: string[] = [];

        const checkLocal = function (inLocal: string, arr: string[]) {
            if (inLocal) {
                const arrTypeSizeInLocal = JSON.parse(inLocal) as string[];
                for (let i = 0; i < arrTypeSizeInLocal.length; i++) {
                    arr.push(arrTypeSizeInLocal[i]);
                }
            }
        };

        checkLocal(sizeInLocal, arrSizeInLocalType);
        checkLocal(shapeInLocal, arrShapeInLocalType);
        checkLocal(colorInLocal, arrColorInLocalType);
        checkLocal(amountInLocal, arrAmountInLocalType);
        checkLocal(yearInLocal, arrYearInLocalType);

        const arrInLocal = [arrSizeInLocalType, arrShapeInLocalType, arrColorInLocalType, arrAmountInLocalType, arrYearInLocalType];
        this.checkFilters(arrInLocal, favoriteInLocal);
    }

    checkFilters(arr: string[][], favorite: boolean) {
        const card = document.querySelectorAll('.card');

        const newData: InfoAboutCard[] = data
            .filter((item) => {
                return arr[TypeFilter.size].length ? !!arr[TypeFilter.size].find((el) => el === item.size.toUpperCase()) : true;
            })
            .filter((item) => {
                return arr[TypeFilter.shape].length ? !!arr[TypeFilter.shape].find((el) => el === item.shape.toUpperCase()) : true;
            })
            .filter((item) => {
                return arr[TypeFilter.color].length ? !!arr[TypeFilter.color].find((el) => el === item.color.toUpperCase()) : true;
            })
            .filter((item) => {
                return arr[TypeFilter.amount].length ? +item.count >= +arr[TypeFilter.amount][IND_START] && +item.count <= +arr[TypeFilter.amount][IND_END] : true;
            })
            .filter((item) => {
                return arr[TypeFilter.year].length ? item.year >= arr[TypeFilter.year][IND_START] && item.year <= arr[TypeFilter.year][IND_END] : true;
            })
            .filter((item) => {
                return !favorite ? true : 'ДА' === item.favorite.toUpperCase();
            });

        currentCards = newData;

        card.forEach((item) => item.remove());
        this.card.giveCardContent(newData);
        this.sort.chooseSort();
    }
}
