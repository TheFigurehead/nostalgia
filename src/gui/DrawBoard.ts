import {States} from "../States";

export class DrawBoard{

    public states: States = States.getInstance();

    constructor() {
    }

    drawContent(){

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
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        return this.states.canvas;
    }

    init(){

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const context = canvas.getContext('2d');

        this.states.setCanvas(canvas);
        this.states.setContext(context);

        this.states.canvas.width = window.innerWidth;
        this.states.canvas.height = window.innerHeight;

        document.body.appendChild(this.render());

        this.states.console.setDimensions(
            0,
            this.states.canvas.height*0.4,
            this.states.canvas.width,
            this.states.canvas.height*0.6
        );

        this.states.console.init();

        if(this.states.workbench){
            this.states.workbench.drawWorkbench();
        }

        this.drawContent();

    }

}