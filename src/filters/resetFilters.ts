import {
    TotalFilters,
    FilterByShape,
    FilterBySize,
    FilterByColor,
    FilterByFavorite,
    RangeFilters,
    Sort,
    Selected,
    sort,
    totalFilters,
    filterByShape,
    filterBySize,
    filterByColor,
    filterByFavorite,
    rangeFilters,
} from '../constants';

export let isReset = false;
export let isLocalReset = false;

export class ResetFilters {
    private sort: Sort;
    private selected: Selected;
    private totalFilters: TotalFilters;
    private filterByShape: FilterByShape;
    private filterBySize: FilterBySize;
    private filterByColor: FilterByColor;
    private filterByFavorite: FilterByFavorite;
    private rangeFilters: RangeFilters;

    constructor() {
        this.sort = sort;
        this.selected = new Selected();
        this.totalFilters = totalFilters;
        this.filterByShape = filterByShape;
        this.filterBySize = filterBySize;
        this.filterByColor = filterByColor;
        this.filterByFavorite = filterByFavorite;
        this.rangeFilters = rangeFilters;
    }

    localReset() {
        const reset = document.querySelector('.reset') as HTMLElement;
        const localReset = document.querySelector('.local-reset') as HTMLElement;
        const arrResetFilters = ['type shape', 'type color', 'type size', 'favorite', 'slider amount', 'slider year'];
        const arrResetSettings = [
            'type shape',
            'type color',
            'type size',
            'favorite',
            'slider amount',
            'slider year',
            'total selected toys',
            'selected toys',
            'sort type',
            'total toys',
        ];

        reset.addEventListener('click', () => {
            arrResetFilters.forEach((item) => {
                localStorage.removeItem(item);
                isReset = true;
                this.updateCards();
            });
        });

        localReset.addEventListener('click', () => {
            arrResetSettings.forEach((item) => {
                localStorage.removeItem(item);
                isLocalReset = true;
                this.updateCards();
            });
        });
    }

    updateCards() {
        const color = document.querySelectorAll('.input-color') as unknown as HTMLInputElement[];
        const icon = document.querySelectorAll('.icon') as unknown as HTMLElement[];
        const favoriteInput = document.querySelector('.favorite-input') as HTMLInputElement;

        color.forEach((item) => {
            item.checked = false;
        });

        icon.forEach((item) => {
            item.classList.remove('active');
        });

        favoriteInput.checked = false;

        this.filterByShape.resetOption();
        this.filterByColor.resetOption();
        this.filterBySize.resetOption();
        this.filterByFavorite.favorite();
        this.totalFilters.createNewData();
        this.rangeFilters.resetRange();
        isReset = false;

        if (isLocalReset) {
            this.sort.chooseSort();
            this.selected.resetSelected();
            isLocalReset = false;
        }
    }
}
