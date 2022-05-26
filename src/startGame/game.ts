import {
    ToysSlots,
    Garland,
    SettingsForTree,
    startPage,
    pageToys,
    pageTree,
    iconMainPage,
    buttonStart,
    linkToToysPage,
    linkToTreePage,
    searchWrap,
} from '../constants';

type AnotherPagesLink = {
    [key: string]: HTMLElement;
}

export class Game {
    private settingsForTree: SettingsForTree;
    private garland: Garland;
    private toysSlots: ToysSlots;

    constructor() {
        this.settingsForTree = new SettingsForTree();
        this.garland = new Garland();
        this.toysSlots = new ToysSlots();
    }

    start() {
        const showMainPage = (): void => {
            startPage.classList.remove('hide', 'activeLink');
            pageToys.classList.add('hide');
            pageTree.classList.add('hide');
            searchWrap.classList.add('hide');
            this.garland.showGarland();
        }

        const showToysPage = () => {
            startPage.classList.add('hide');
            pageToys.classList.remove('hide');
            pageTree.classList.add('hide');
            searchWrap.classList.remove('hide');
        }

        const showTreePage = () => {
            startPage.classList.add('hide');
            pageToys.classList.add('hide');
            pageTree.classList.remove('hide');
            searchWrap.classList.add('hide');
            this.toysSlots.fillSlots();
            this.settingsForTree.startSettings();
        }

        const pageNavigation = [
            {link: iconMainPage, namePage: 'main', func: showMainPage},
            {link: buttonStart, namePage: 'toys', func: showToysPage},
            {link: linkToToysPage, namePage: 'toys', func: showToysPage},
            {link: linkToTreePage, namePage: 'tree', func: showTreePage}
        ];

        const addActiveLink = (link: string) => {
            const links = ['main', 'toys', 'tree'];
            const applicationPagesLink: AnotherPagesLink = {
                'main': iconMainPage,
                'toys': linkToToysPage,
                'tree': linkToTreePage,
            }

            links.forEach((item) => {
                item === link ? applicationPagesLink[item].classList.add('active-page') : applicationPagesLink[item].classList.remove('active-page');
            })
        }

        showMainPage();
        pageNavigation.forEach((page) => {
            (page.link).addEventListener('click', () => {
                page.func();
                addActiveLink(page.namePage);
            });
        });
    }
}
