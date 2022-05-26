import {
    ball,
    bell,
    cone,
    snowflake,
    toy,
} from '../constants';

import {
    Filter,
    ObjOptionType,
} from './filter';

export class FilterByShape extends Filter {
    protected filterOptions: ObjOptionType[] = [
        {name: 'ШАР', htmlElem: ball},
        {name: 'КОЛОКОЛЬЧИК', htmlElem: bell},
        {name: 'ШИШКА', htmlElem: cone},
        {name: 'СНЕЖИНКА', htmlElem: snowflake},
        {name: 'ФИГУРКА', htmlElem: toy},
    ]
    protected optionType = 'type shape';
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
                }
            })
        })
    }
}
