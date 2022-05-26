import {
    TotalFilters,
    totalFilters,
    isLocalReset,
    isReset,
} from "../constants";

export interface ObjOptionType {
    name: string,
    htmlElem: HTMLElement | HTMLInputElement;
}

export abstract class Filter {
    protected totalFilters: TotalFilters;
    protected filterOptions: ObjOptionType[] = [];
    protected optionType = '';
    protected arrNameOption: string[] = [];

    protected constructor() {
        this.totalFilters = totalFilters;
    }

    abstract activeOption(option: HTMLElement, nameOption: string): void;
    abstract highlightOptionFromLocal(arrNameInLocalType: string[], optionState: ObjOptionType[]): void;

    selectOption(): void {
        const arrNameInLocalType: string[] = [];
        this.checkOptionInLocal(arrNameInLocalType, this.optionType, this.filterOptions);

        this.filterOptions.forEach((item: ObjOptionType) => {
            item.htmlElem.addEventListener('click', () => {
                this.activeOption(item.htmlElem, item.name);
            });
        })

        this.arrNameOption = isReset || isLocalReset ? [] : arrNameInLocalType;
    }

    resetOption() {
        if (isReset || isLocalReset) {
            this.arrNameOption = [];
            location.reload();
        }
    }

    searchIndex (option: string) {
        const indexOptionInArray: number = this.arrNameOption.length ? this.arrNameOption.indexOf(option) : -1;
        indexOptionInArray === -1 ? this.arrNameOption.push(option) : this.arrNameOption.splice(indexOptionInArray, 1);
        localStorage.setItem(this.optionType, JSON.stringify(this.arrNameOption));
    }

    checkOptionInLocal(arrNameInLocalType: string[], optionType: string, optionState: ObjOptionType[]): void {
        const typeOptionInLocal = localStorage.getItem(optionType);

        if (typeOptionInLocal) {
            const arrTypeOptionInLocal = JSON.parse(typeOptionInLocal) as string[];
            for (let i = 0; i < arrTypeOptionInLocal.length; i++) {
                arrNameInLocalType.push(arrTypeOptionInLocal[i]);
            }

            this.highlightOptionFromLocal(arrNameInLocalType, optionState);
            this.arrNameOption = arrNameInLocalType || [];
            this.totalFilters.createNewData();
        }
    }
}
