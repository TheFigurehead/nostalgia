import {AppWindow} from "../window/Base";
import {States} from "../States";

export class DrawBoard{

    public states: States = States.getInstance();

    constructor() {
    }

    drawContent(){
        this.states.canvas.width = window.innerWidth;
        this.states.canvas.height = window.innerHeight;

        this.states.console.setDimensions();

        this.states.context.fillStyle = '#fff';
        this.states.context.fillRect(0, 0, this.states.canvas.width, this.states.canvas.height);

        this.states.context.fillStyle = '#55ffff';
        this.states.context.fillRect(10, 10, 100, 100);

        this.states.context.fillStyle = '#ffff55';
        this.states.context.fillRect(10, 120, 100, 100);

        this.states.context.fillStyle = '#ffffff';
        this.states.context.fillRect(10, 230, 100, 100);

        this.states.context.fillStyle = '#00aaaa';
        this.states.context.fillRect(120, 10, 100, 100);

        this.states.context.fillStyle = '#fff';
        this.states.context.fillRect(230, 10, 100, 100);

        this.states.console.drawConsole();

        Object.keys(this.states.windows).forEach((key: string) => {
            this.states.windows[key].drawWindow();
        });
    }

    resizeCanvas(){
        this.drawContent();
    }

    render() {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const context = canvas.getContext('2d');

        this.states.setCanvas(canvas);
        this.states.setContext(context);

        window.addEventListener('resize', this.resizeCanvas.bind(this), false);

        this.drawContent();

        return canvas;
    }

    init(){
        document.body.appendChild(this.render());
    }

}