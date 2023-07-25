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


        // const path = new Path2D();

        // path.moveTo(0, this.states.canvas.height*0.7);
        // path.lineTo(this.states.canvas.width, this.states.canvas.height*0.7);
        //
        // this.states.context.strokeStyle = 'red';
        // this.states.context.stroke(path);
        //
        // this.states.context.restore();
        //
        // let iter = this.states.canvas.height*0.7;

        // setInterval(() => {
        //     // this.states.context.clearRect(0, 0, this.states.canvas.width, this.states.canvas.height);
        //     this.states.context.restore();
        //     path.moveTo(0, iter);
        //     path.lineTo(this.states.canvas.width, iter);
        //     this.states.context.strokeStyle = 'red';
        //     this.states.context.stroke(path);
        //     this.states.context.save();
        //     iter -= 10;
        // }, 100);
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