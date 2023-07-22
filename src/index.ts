import * as _ from 'lodash';
import './assets/style.scss';

import { Console } from "./console/Console";
import { AppWindow } from "./window/Base";

function initCanvas() {

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const console = new Console(canvas, context);
    const windowObj = new AppWindow(context);

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        console.setDimensions();

        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#55ffff';
        context.fillRect(10, 10, 100, 100);

        context.fillStyle = '#ffff55';
        context.fillRect(10, 120, 100, 100);

        context.fillStyle = '#ffffff';
        context.fillRect(10, 230, 100, 100);

        context.fillStyle = '#00aaaa';
        context.fillRect(120, 10, 100, 100);

        context.fillStyle = '#fff';
        context.fillRect(230, 10, 100, 100);

        console.drawConsole();

        windowObj.drawWindow();

    }

    resizeCanvas();

    return canvas;
}

document.body.appendChild(initCanvas());