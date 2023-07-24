import {States} from "../States";

export class DrawBoard{

    public states: States = States.getInstance();

    constructor() {
    }

    drawContent(){
        this.states.canvas.width = window.innerWidth;
        this.states.canvas.height = window.innerHeight;

        this.states.console.setDimensions();

        this.states.console.drawConsole();
        this.states.workbench.drawWorkbench();

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