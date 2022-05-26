import {
    TotalFilters,
    isReset,
    isLocalReset,
    slidersAmount,
    startAmount,
    endAmount,
    slidersYear,
    startYear,
    endYear,
    progressAmount,
    progressYear,
    totalFilters,
} from '../constants';

const typeInLocalAmount = localStorage.getItem('slider amount') || '';
const typeInLocalYear = localStorage.getItem('slider year') || '';
const INDEX_START = 0;
const INDEX_END = 1;
const START_VALUE_AMOUNT = 1;
const DIFF_START_AND_END_AMOUNT = 11;
const START_VALUE_YEAR = 1940;
const DIFF_START_AND_END_YEAR = 80;

export class RangeFilters {
    private totalFilters: TotalFilters;

    constructor() {
        this.totalFilters = totalFilters;
    }

    showSlider() {
        this.checkLocal();

        const startSlider = (sliders: HTMLInputElement[], start: HTMLOutputElement, end: HTMLOutputElement, typeSlider: string) => {
            sliders[INDEX_START].addEventListener('input', () => {
                if (+sliders[INDEX_START].value > +sliders[INDEX_END].value) {
                    sliders[INDEX_END].value = sliders[INDEX_START].value;
                }
            });

            sliders[INDEX_END].addEventListener('input', () => {
                if (+sliders[INDEX_END].value < +sliders[INDEX_START].value) {
                    sliders[INDEX_START].value = sliders[INDEX_END].value;
                }
            });

            sliders.forEach((slider) => {
                slider.addEventListener('input', () => {
                    start.value = sliders[INDEX_START].value;
                    end.value = sliders[INDEX_END].value;
                    localStorage.setItem(typeSlider, JSON.stringify([start.value, end.value]));
                    this.totalFilters.createNewData();
                    this.backgroundProgress(typeSlider, start, end);
                });
            });
        }

        startSlider(slidersAmount, startAmount, endAmount, 'slider amount');
        startSlider(slidersYear, startYear, endYear, 'slider year');
    }

    checkLocal() {
        const checkLocal = (
            typeInLocal: string,
            slider: HTMLInputElement[],
            start: HTMLOutputElement,
            end: HTMLOutputElement,
            typeRange: string
        ) => {
            const startAndEnd: string[] = [];
            const arrInLocal = JSON.parse(typeInLocal) as string[];

            for (let i = 0; i < arrInLocal.length; i++) {
                startAndEnd.push(arrInLocal[i]);
            }

            slider[INDEX_START].value = startAndEnd[INDEX_START];
            slider[INDEX_END].value = startAndEnd[INDEX_END];
            start.value = startAndEnd[INDEX_START];
            end.value = startAndEnd[INDEX_END];
            this.backgroundProgress(typeRange, start, end);

            this.totalFilters.createNewData();
        }

        if (typeInLocalAmount) {
            checkLocal(typeInLocalAmount, slidersAmount, startAmount, endAmount, 'slider amount');
        }

        if (typeInLocalYear) {
            checkLocal(typeInLocalYear, slidersYear, startYear, endYear, 'slider year');
        }
    }

    resetRange() {
        if (isReset || isLocalReset) {
            resetSlider(slidersAmount, startAmount, endAmount);
            resetSlider(slidersYear, startYear, endYear);
        }

        function resetSlider(slider: HTMLInputElement[], start: HTMLOutputElement, end: HTMLOutputElement) {
            const sliderStart = slider[INDEX_START];
            const sliderEnd = slider[INDEX_END];

            sliderStart.value = sliderStart.min;
            sliderEnd.value = sliderEnd.max;
            start.value = sliderStart.min;
            end.value = sliderEnd.max;
        }

        progressAmount.style.background = '#278D9F';
        progressYear.style.background = '#278D9F';
    }

    backgroundProgress(typeRange: string, start: HTMLOutputElement, end: HTMLOutputElement) {
        const paintProgressBar = function (progressType: HTMLElement, startValue: number, differentStartAndEnd: number) {
            const startPaint = ((+start.value - startValue) * 100) / differentStartAndEnd;
            const endPaint = ((+end.value - startValue) * 100) / differentStartAndEnd;

            progressType.style.background = `linear-gradient(to right, #fff 0%, #fff ${startPaint}%, #278D9F ${startPaint}%, #278D9F ${endPaint}%, #fff ${endPaint}%, #fff 100%)`;
        };

        typeRange === 'slider amount'
            ? paintProgressBar(progressAmount, START_VALUE_AMOUNT, DIFF_START_AND_END_AMOUNT)
            : paintProgressBar(progressYear, START_VALUE_YEAR, DIFF_START_AND_END_YEAR);
    }
}
