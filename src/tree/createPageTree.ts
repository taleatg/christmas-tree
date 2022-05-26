const AMOUNT_TREE_CARDS = 6;
const AMOUNT_BG_CARDS = 10;
const AMOUNT_GARLAND = 5;

export class PageTree {
    createPageChristmasTree() {
        this.createTreeCards();
        this.createBgCards();
        this.createGarland();
    }

    createCards(amountCards: number, parent: HTMLElement, addClass: string) {
        for (let i = 0; i < amountCards; i++) {
            const oneSlot = document.createElement('div');
            oneSlot.classList.add(addClass);
            addClass === 'tree-card' ? oneSlot.setAttribute('data-num-tree', `${i + 1}`) : oneSlot.setAttribute('data-num-bg', `${i + 1}`);
            parent.appendChild(oneSlot);
        }
    }

    createTreeCards() {
        const treeCardsWrap = document.querySelector('.tree-cards-wrap') as HTMLElement;
        this.createCards(AMOUNT_TREE_CARDS, treeCardsWrap, 'tree-card');
    }

    createBgCards() {
        const bgCardsWrap = document.querySelector('.bg-cards-wrap') as HTMLElement;
        this.createCards(AMOUNT_BG_CARDS, bgCardsWrap, 'bg-card');
    }

    createGarland() {
        const garlandButtonWrap = document.querySelector('.garland-button-wrap') as HTMLElement;
        const colorButton = [ 'red-garland', 'yellow-garland', 'green-garland', 'blue-garland', 'mix-garland'];

        for (let i = 0; i < AMOUNT_GARLAND; i++) {
            const button = document.createElement('button');
            button.classList.add('garland-button', colorButton[i]);
            garlandButtonWrap.appendChild(button);
        }
    }
}
