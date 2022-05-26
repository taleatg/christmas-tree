import {
    tree,
    treeWrap,
    area,
} from '../constants';

const PERCENT = 100;
let cordX: number;
let cordY: number;
let currentToy: HTMLElement;

export class ToyMovement {
    startMove(): void {
        const oneToy = document.querySelectorAll('.one-toy') as unknown as HTMLElement[];

        for (let i = 0; i < oneToy.length; i++) {
            oneToy[i].addEventListener('dragstart', (e) => {
                currentToy = oneToy[i];
                oneToy[i].classList.add('move-toy');
                e.dataTransfer?.setData('text', oneToy[i].id);
                cordX = e.offsetX;
                cordY = e.offsetY;
            })
        }

        area.addEventListener('dragover', (e) => {
            e.preventDefault();
        })

        area.addEventListener('drop', (e) => {
            const marginTreeHorizontal = (treeWrap.clientWidth - tree.clientWidth) / 2;
            const marginTreeVertical = (treeWrap.clientHeight - tree.clientHeight) ;
            const item = e.dataTransfer?.getData('text') ?? '';
            const elem = <HTMLElement>document.getElementById(item);

            elem.style.top = String((e.offsetY - cordY ) * PERCENT / (tree.clientHeight + marginTreeVertical))  + '%';
            elem.style.left = String((e.offsetX - cordX + marginTreeHorizontal) * PERCENT / (treeWrap.clientWidth)) + '%';
            treeWrap.appendChild(elem);
            this.countToysLeft(currentToy);
        })

        area.addEventListener('dragleave', this.listenerDragleave);
    }

    listenerDragleave = (): void => {
        const idSlotCurrentToy = currentToy.id.split('-')[0];
        const slot = document.getElementById(idSlotCurrentToy) as HTMLElement;
        const listenerDragend = () => {
            currentToy.classList.remove('move-toy');
            currentToy.style.top = currentToy.style.left = '50%';
            currentToy.remove();
            if (slot) {
                slot.appendChild(currentToy);
                this.countToysLeft(currentToy);
            }
            currentToy.removeEventListener('dragend', listenerDragend);
        }

        area.addEventListener('dragenter', () => {
            currentToy.removeEventListener('dragend', listenerDragend);
        });

        currentToy.addEventListener('dragend', listenerDragend);
    }

    countToysLeft(currentToy: HTMLElement) {
        const idSlotCurrentToy = currentToy.id.split('-')[0];
        const slot = document.getElementById(idSlotCurrentToy) as HTMLElement;
        const newAmount = slot.children.length - 1;
        let amountToys: HTMLElement;

        if (slot) {
            amountToys = slot.querySelector('.total-toys') as HTMLElement;
            amountToys.innerHTML = String(newAmount);
        }
    }
}
