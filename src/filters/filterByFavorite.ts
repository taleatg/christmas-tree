import {
    TotalFilters,
    isReset,
    isLocalReset,
} from '../constants';

export class FilterByFavorite {
    private totalFilters: TotalFilters;

    constructor() {
        this.totalFilters = new TotalFilters();
    }

    favorite() {
        const favoriteInput = document.querySelector('.favorite-input') as HTMLInputElement;
        let isFavoriteChecked = !!JSON.parse(<string>localStorage.getItem('favorite'));

        if (isFavoriteChecked) {
            favoriteInput.checked = true;
            this.totalFilters.createNewData();
        }

        favoriteInput.addEventListener('click', () => {
            const isChecked = (checked: boolean) => {
                isFavoriteChecked = checked;
                localStorage.setItem('favorite', JSON.stringify(checked));
                this.totalFilters.createNewData();
            };

            !isFavoriteChecked ? isChecked(true) : isChecked(false);
        });

        if (isReset || isLocalReset) {
            favoriteInput.checked = false;
        }
    }
}
