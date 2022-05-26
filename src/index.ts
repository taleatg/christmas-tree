import {
    card,
    data,
    sort,
    RangeFilters,
    FilterByShape,
    FilterBySize,
    FilterByFavorite,
    FilterByColor,
    search,
    ResetFilters,
    selected,
    game,
    objPageTree,
    SettingsForTree,
    coordsArea,
    numCurrentTree,
} from './constants';

const filterByShape = new FilterByShape();
const filterBySize = new FilterBySize();
const filterByFavorite = new FilterByFavorite();
const filterByColor = new FilterByColor();
const rangeFilters = new RangeFilters();
const resetFilters = new ResetFilters();
const settingsForTree = new SettingsForTree();

game.start();
card.giveCardContent(data);
objPageTree.createPageChristmasTree();
sort.chooseSort();
rangeFilters.showSlider();
filterByShape.selectOption();
filterBySize.selectOption();
filterByFavorite.favorite();
filterByColor.selectOption();
search.searchToys();
resetFilters.localReset();
selected.showOnlySelected();
settingsForTree.startOrStopMusic();
settingsForTree.showOrHideSnow();
window.addEventListener('resize', () => {
    coordsArea.getCoords(numCurrentTree);
});
