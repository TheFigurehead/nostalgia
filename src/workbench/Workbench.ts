import {States} from "../States";

export class Workbench {
    public states: States = States.getInstance();
    constructor() {
        this.states.mouse.addBounds(10, 10, 110, 110, 1, 'pointer');
    }
    drawWorkbench() {
        this.states.context.fillStyle = '#fff';
        this.states.context.fillRect(0, 0, this.states.canvas.width, this.states.canvas.height*0.4);
        this.drawWorkbenchContent();
    }
    drawWorkbenchContent() {
        this.states.context.fillStyle = '#55ffff';
        this.states.context.fillRect(10, 10, 100, 100);
        this.states.context.fillStyle = '#000';
        this.states.context.font = '20px VT323';
        this.states.context.fillText('Window 1', 30, 60);

        // let timeoutCursor: NodeJS.Timeout = null;
        // this.states.canvas.addEventListener('mousemove', (e: MouseEvent) => {
        //     console.log('Mouse: ', this.states.mouse.x, this.states.mouse.y);
        //     if(
        //         e.clientX > 10 &&
        //         e.clientX < 110 &&
        //         e.clientY > 10 &&
        //         e.clientY < 110
        //     ){
        //         if(timeoutCursor) clearTimeout(timeoutCursor);
        //         this.states.canvas.style.cursor = 'pointer';
        //         timeoutCursor = setTimeout(() => {
        //             this.states.canvas.style.cursor = 'default';
        //         }, 400);
        //     }
        // });

        this.states.canvas.addEventListener('click', (e: MouseEvent) => {
            if(
                e.clientX > 10 &&
                e.clientX < 110 &&
                e.clientY > 10 &&
                e.clientY < 110
            ){
                this.states.context.filter = 'blur(5px)';
                this.states.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
                this.states.context.fillRect(10, 10, 100, 100);
                this.states.context.filter = 'none';
            }else{
                this.states.context.fillStyle = '#55ffff';
                this.states.context.fillRect(10, 10, 100, 100);
                this.states.context.fillStyle = '#000';
                this.states.context.font = '20px VT323';
                this.states.context.fillText('Window 1', 30, 60);
            }
        });

        this.states.canvas.addEventListener('dblclick', (e: MouseEvent) => {
            if(
                e.clientX > 10 &&
                e.clientX < 110 &&
                e.clientY > 10 &&
                e.clientY < 110
            ){
                this.states.console.processCommand('run win');
            }
        });

        // this.states.context.fillStyle = '#ffff55';
        // this.states.context.fillRect(10, 120, 100, 100);
        //
        // this.states.context.fillStyle = '#ffffff';
        // this.states.context.fillRect(10, 230, 100, 100);
        //
        // this.states.context.fillStyle = '#00aaaa';
        // this.states.context.fillRect(120, 10, 100, 100);
        //
        // this.states.context.fillStyle = '#fff';
        // this.states.context.fillRect(230, 10, 100, 100);
    }
}