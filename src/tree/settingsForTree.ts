import {
    Garland,
    switchGarland,
    tree,
    treeWrap,
    resetSettings,
    buttonSound,
    CoordsArea,
} from '../constants';

export let isOnGarland = false;
let isSoundMute = false;
let isSnowFall = false;
const sound = new Audio('./assets/audio/audio.mp3');
const TIMER_FOR_THE_SNOWFLAKE_FALL = 5000;
const INTERVAL_SHOW_NEW_SNOWFLAKE = 100;
const MAX_SIZE_SNOWFLAKE = 10;
const INCREASE_SNOWFLAKE_FALL_TIME = 5;
const RANDOM_NUMBER_UNTIL_TWO = 2;

export class SettingsForTree {
    private coordsArea: CoordsArea;
    private garland: Garland;

    constructor() {
        this.coordsArea = new CoordsArea();
        this.garland = new Garland();
    }

    startSettings() {
        this.chooseTree();
        this.chooseBg();
        this.onOrOffGarland();

        resetSettings.addEventListener('click', () => {
            this.resetSettingsForTree();
        });
    }

    chooseImage(allImage: HTMLElement[], elem: HTMLElement, type: string) {
        const dataNum = 'data-num-' + type;
        allImage.forEach(item => {
            item.addEventListener('click', () => {
                const number: string = item.getAttribute(dataNum) || '1';

                if (type === 'bg') {
                    elem.style.backgroundImage = `url(././assets/${type}/${number}.webp)`;
                } else {
                    tree.setAttribute('src', `./assets/tree/${number}.webp`);
                    this.coordsArea.getCoords(+number - 1);
                }

                localStorage.setItem(`num-${type}`, <string>item.getAttribute(dataNum));
            })
        })
    }

    chooseTree() {
        const allTrees = document.querySelectorAll('.tree-card') as unknown as HTMLElement[];
        const treeInLocal = localStorage.getItem('num-tree') || 1;
        tree.setAttribute('src', `./assets/tree/${treeInLocal}.webp`);
        this.chooseImage(allTrees, tree, 'tree');
    }

    chooseBg() {
        const allBg = document.querySelectorAll('.bg-card') as unknown as HTMLElement[];
        const bgInLocal = localStorage.getItem('num-bg') || 1;
        treeWrap.style.backgroundImage = `url(././assets/bg/${bgInLocal}.webp)`;
        this.chooseImage(allBg, treeWrap, 'bg');
    }

    showOrHideSnow() {
        const buttonSnow = document.querySelector('.snow') as HTMLElement;
        const treeWrap = document.querySelector('.tree-wrap') as HTMLElement;
        isSnowFall = JSON.parse(<string>localStorage.getItem('snow')) === true;

        const startSnow = () => {
            const snowflake = document.createElement('div');
            if (!isSnowFall) return;

            const size = Math.random() * MAX_SIZE_SNOWFLAKE + MAX_SIZE_SNOWFLAKE;
            const time = Math.random() * RANDOM_NUMBER_UNTIL_TWO + INCREASE_SNOWFLAKE_FALL_TIME;

            snowflake.style.width = snowflake.style.height = size.toString() + 'px';
            snowflake.style.left = (Math.random() * (treeWrap.offsetWidth)).toString() + 'px';
            snowflake.style.animationDuration = time.toString() + 's';
            snowflake.style.opacity = String(Math.random());
            snowflake.classList.add('snowflake');
            treeWrap.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, TIMER_FOR_THE_SNOWFLAKE_FALL);
        }

        if (isSnowFall) {
            buttonSnow.classList.add('active');
            setInterval(startSnow,  INTERVAL_SHOW_NEW_SNOWFLAKE)
        }

        buttonSnow.addEventListener('click', () => {
            isSnowFall = !isSnowFall;
            setInterval(startSnow, INTERVAL_SHOW_NEW_SNOWFLAKE);
            buttonSnow.classList.toggle('active');
            localStorage.setItem('snow', JSON.stringify(isSnowFall));
        })
    }

    startOrStopMusic() {
        sound.volume = 0.2;
        sound.loop = true;
        isSoundMute = JSON.parse(<string>localStorage.getItem('sound')) === true;

        const soundPlay = () => {
            sound.play()
                .then(() => buttonSound.classList.add('active'))
                .catch(() => sound.pause())
        }

        const soundToggle = () => {
            localStorage.setItem('sound', JSON.stringify(isSoundMute));
            document.removeEventListener('click', soundPlay);
        }

        if (isSoundMute) {
            document.addEventListener('click', soundPlay);
        }

        buttonSound.addEventListener('click', () => {
            !isSoundMute ? soundPlay() : sound.pause();
            isSoundMute = !isSoundMute;
            buttonSound.classList.toggle('active');
            soundToggle();
        })

        resetSettings.addEventListener('click', () => {
            sound.pause();
            isSoundMute = false;
            sound.currentTime = 0;
            buttonSound.classList.remove('active');
            soundToggle();
        })
    }

    onOrOffGarland() {
        const buttonMix = document.querySelector('.mix-garland') as HTMLElement;
        const buttonGreen = document.querySelector('.green-garland') as HTMLElement;
        const buttonRed = document.querySelector('.red-garland') as HTMLElement;
        const buttonBlue = document.querySelector('.blue-garland') as HTMLElement;
        const buttonYellow = document.querySelector('.yellow-garland') as HTMLElement;
        const checkColorInLocal = localStorage.getItem('color-garland') || 'mix';
        const showOrHideGarland = JSON.parse(<string>localStorage.getItem('show-garland')) as boolean;

        const showGarland = (color: string) => {
            isOnGarland = switchGarland.checked = true;
            this.garland.createGarlandForTree(color);
            localStorage.setItem('color-garland', color);
            localStorage.setItem('show-garland', JSON.stringify(true));
        }

        if (showOrHideGarland) {
            showGarland(checkColorInLocal);
        }

        switchGarland.addEventListener('click', () => {
            isOnGarland =  switchGarland.checked;
            !isOnGarland ? this.garland.createGarlandForTree('') : this.garland.createGarlandForTree(localStorage.getItem('color-garland') || 'mix');
            isOnGarland ? localStorage.setItem('show-garland', JSON.stringify(true)) : localStorage.setItem('show-garland', JSON.stringify(false));
        })

        const typeGarland: [string, HTMLElement][] = [['mix', buttonMix], ['lightgreen', buttonGreen], ['red', buttonRed], ['blue', buttonBlue], ['gold', buttonYellow]];
        typeGarland.forEach(type => {
            type[1].addEventListener('click', () => {
                showGarland(type[0]);
            })
        })
    }

    resetSettingsForTree() {
        const arrResetSettings = ['num-tree', 'num-bg', 'color-garland', 'show-garland', 'sound', 'snow'];
        const buttonSnow = document.querySelector('.snow') as HTMLElement;

        arrResetSettings.forEach(item => {
            localStorage.removeItem(item);
        })

        treeWrap.style.backgroundImage = 'url(././assets/bg/1.webp)';
        tree.setAttribute('src', './assets/tree/1.webp');
        isOnGarland = switchGarland.checked = false;
        this.garland.createGarlandForTree('');
        buttonSnow.classList.remove('active');
        isSnowFall = false;
    }
}
