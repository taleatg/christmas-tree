import {
    isOnGarland
} from '../constants';

const AMOUNT_BALL_FOR_MAIN_GARLAND_BALL_FOR_MAIN_GARLAND = 28;
const AMOUNT_LAYER_GARLAND = 5;
const MARGIN = 4;
const TOTAL_BALL_IN_LAYER = [7, 13, 17, 23, 29];

export class Garland {
    showGarland() {
        const garland = document.querySelector('.garland') as HTMLElement;

        while (garland.firstChild) {
            garland.removeChild(garland.firstChild);
        }

        for (let i = 0; i < AMOUNT_BALL_FOR_MAIN_GARLAND_BALL_FOR_MAIN_GARLAND; i++) {
            const ball = document.createElement('div');

            ball.classList.add('bulb');
            garland.append(ball);
        }
    }

    createGarlandForTree(color: string) {
        const currentLayer = document.querySelectorAll('.layer') as unknown as HTMLElement[];
        const garlandWrap = document.querySelector('.garland-wrap') as HTMLElement;
        const arrColor = ['red', 'orange', 'green', 'blue', 'indigo', 'gold', 'violet'];
        const isMixColor = color === 'mix';

        currentLayer.forEach(item => item.remove());

        const colorMix = function () {
            const numColor = Math.floor(Math.random() * arrColor.length);
            color = arrColor[numColor];
        }

        const createGarland = function () {
            for (let i = 0; i < AMOUNT_LAYER_GARLAND; i++) {
                const layer = document.createElement('div');
                let topGarland = 0;

                layer.classList.add('layer', `layer-${i + 1}`);
                garlandWrap.appendChild(layer);

                for (let j = 0; j < TOTAL_BALL_IN_LAYER[i]; j++) {
                    const ball = document.createElement('div');
                    const mediumGarland = Math.floor(TOTAL_BALL_IN_LAYER[i] / 2);

                    if (isMixColor) {
                        colorMix();
                    }
                    topGarland = j < TOTAL_BALL_IN_LAYER[i] / 2 ? topGarland + MARGIN: topGarland - MARGIN;
                    ball.style.top = String(topGarland) + 'px';
                    if (j === mediumGarland) {
                        ball.style.top = String(topGarland - MARGIN) + 'px';
                    }
                    ball.classList.add('garland-ball');
                    ball.style.backgroundColor = color;
                    ball.style.boxShadow = `1px 1px 15px ${color}, -1px -1px 15px ${color}`;
                    layer.appendChild(ball);
                }
            }
        }

        if (isOnGarland) {
            createGarland();
        }
    }
}
