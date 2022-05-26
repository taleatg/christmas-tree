import {
    ToyMovement,
    savedSelectedToys,
    data,
    toysSlot,
} from '../constants';

type ObjCountToys = {
    [key: string]: string;
}

const AMOUNT_DEFAULT_SLOTS = 20;

export class ToysSlots {
    private toyMovement: ToyMovement;

    constructor() {
        this.toyMovement = new ToyMovement();
    }

    fillSlots() {
        const currentToysSlot = document.querySelectorAll('.slot-one-toy') as unknown as HTMLElement[];
        const defaultToys: string[] = [];

        currentToysSlot.forEach(item => item.remove());

        for (let i = 0; i < AMOUNT_DEFAULT_SLOTS; i++) {
            defaultToys.push(data[i].num);
        }

        !savedSelectedToys.length ? this.startFillSlots(AMOUNT_DEFAULT_SLOTS, defaultToys) : this.startFillSlots(savedSelectedToys.length, savedSelectedToys);
        this.resetToys();
    }

    startFillSlots(amountSlots: number, arrNumToys: string[]) {
       for (let i = 0; i < amountSlots; i++) {
           const slot = document.createElement('div');
           const amountToys = document.createElement('div');
           const slotId = savedSelectedToys.length ?  `${savedSelectedToys[i]}` : `${i + 1}`;
           slot.setAttribute('id', slotId);

           const alreadyExistToysOnTree =  this.countAmountToys();
           let amountCurrentCard = Number(data[+arrNumToys[i] - 1].count);
           amountCurrentCard = alreadyExistToysOnTree[slotId] ? amountCurrentCard - Number(alreadyExistToysOnTree[slotId]) : amountCurrentCard;

           const fillSlot = () => {
               for (let j = 0; j < amountCurrentCard; j++) {
                   const toy = document.createElement('div');
                   const toyId = savedSelectedToys.length ? `${savedSelectedToys[i]}-${j}` : `${i + 1}-${j}`;

                   slot.classList.add('slot-one-toy');
                   toy.classList.add('one-toy');
                   toy.setAttribute('id', toyId);
                   toy.setAttribute('draggable', 'true');
                   toy.style.backgroundImage = `url(././assets/toys/${arrNumToys[i]}.webp)`;
                   toysSlot.appendChild(slot);
                   slot.appendChild(toy);
               }
           }

           const createEmptySlot = () => {
               slot.classList.add('slot-one-toy');
               toysSlot.appendChild(slot);
           }

           amountCurrentCard === 0 ? createEmptySlot() : fillSlot();
           amountToys.classList.add('total-toys');
           amountToys.innerHTML = String(amountCurrentCard);
           slot.appendChild(amountToys);
       }

        this.toyMovement.startMove();
    }

    getToysOnTree() {
        const currentToysOnTree = document.querySelectorAll('.move-toy') as unknown as HTMLElement[];
        const toyIds: string[] = [];

        currentToysOnTree.forEach(toy => {
            toyIds.push(toy.id.split('-')[0])
        })

        return toyIds;
    }

    countAmountToys() {
        const toysOnTree = this.getToysOnTree();

        const createObjCountToys = (arr: string[]) => {
            const objCountToys: ObjCountToys = {};

            arr.forEach(item => {
                const countToys = arr.filter(num => num === item);
                objCountToys[item] = String(countToys.length);
            })
            return objCountToys;
        }

        return createObjCountToys(toysOnTree);
    }

    resetToys() {
        const buttonResetToys = document.querySelector('.reset-toys') as HTMLElement;
        buttonResetToys.addEventListener('click', () => {
            const currentToysOnTree = document.querySelectorAll('.move-toy') as unknown as HTMLElement[];
            currentToysOnTree.forEach(toys => toys.remove());
            this.fillSlots();
        })
    }
}
