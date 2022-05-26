import {
    inputWhite,
    inputYellow,
    inputRed,
    inputBlue,
    inputGreen,
} from '../constants';

import {
    Filter,
    ObjOptionType,
} from './filter';

export class FilterByColor extends Filter {
    protected filterOptions: ObjOptionType[] = [
        {name: 'БЕЛЫЙ', htmlElem: inputWhite},
        {name: 'ЖЕЛТЫЙ', htmlElem: inputYellow},
        {name: 'КРАСНЫЙ', htmlElem: inputRed},
        {name: 'СИНИЙ', htmlElem: inputBlue},
        {name: 'ЗЕЛЁНЫЙ', htmlElem: inputGreen},
    ]
    protected optionType = 'type color';
    protected arrNameOption: string[] = [];

    constructor() {
        super();
    }

    activeOption (option: HTMLElement, nameOption: string) {
        this.searchIndex(nameOption);
        this.totalFilters.createNewData();
    }

    highlightOptionFromLocal(arrNameInLocalType: string[], optionState: ObjOptionType[]) {
        arrNameInLocalType.forEach((item) => {
            optionState.forEach((elem) => {
                if (item === elem.name) {
                    (elem.htmlElem as HTMLInputElement).checked = true;
                }
            })
        })
    }
}
