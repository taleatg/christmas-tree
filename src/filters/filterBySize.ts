import {
    large,
    medium,
    small,
} from '../constants';

import {
    Filter,
    ObjOptionType,
} from './filter';

export class FilterBySize extends Filter {
    protected filterOptions: ObjOptionType[] = [
        {name: 'БОЛЬШОЙ', htmlElem: large},
        {name: 'СРЕДНИЙ', htmlElem: medium},
        {name: 'МАЛЫЙ', htmlElem: small},
    ]
    protected optionType = 'type size';
    protected arrNameOption: string[] = [];

    constructor() {
        super();
    }

    activeOption (option: HTMLElement, nameOption: string) {
        option.classList.toggle('active');
        this.searchIndex(nameOption);
        this.totalFilters.createNewData();
    }

    highlightOptionFromLocal(arrNameInLocalType: string[], optionState: ObjOptionType[]) {
        arrNameInLocalType.forEach((item) => {
            optionState.forEach((elem) => {
                if (item === elem.name) {
                    elem.htmlElem.classList.add('active');
                    (elem.htmlElem as HTMLInputElement).checked = true;
                }
            })
        })
    }
}
