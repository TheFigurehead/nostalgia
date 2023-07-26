import { States } from '../States';
export class AppWindow {
    public name: string = '';
    public active: boolean = true;
    public dimensions = {x:50, y: 50, width: 550, height: 550};
    public redrawTimeoutId:  NodeJS.Timeout;

    public mouseEvent = {
        x: 0,
        y: 0,
        down: false,
        up: false
    }

    public states: States = States.getInstance();
    constructor(name: string) {
        this.name = name;
    }

    private clickDetect() {
        // console.log(this);
        // this.states.canvas.addEventListener('click', (e) => {
        //     if(
        //         e.clientX > this.dimensions.x
        //         && e.clientX < this.dimensions.x + this.dimensions.width
        //         && e.clientY > this.dimensions.y
        //         && e.clientY < this.dimensions.y + this.dimensions.height
        //     ){
        //         // alert('Window clicked!')
        //         // console.log('Window clicked!');
        //     }
        // });
    }

    closeDetect() {
        this.states.canvas.addEventListener('click', (e) => {
            if(
                e.clientX > this.dimensions.x + this.dimensions.width - 50 &&
                e.clientX < this.dimensions.x + this.dimensions.width &&
                e.clientY > this.dimensions.y &&
                e.clientY < this.dimensions.y + 60
            ){
                this.states.removeWindow(this.name);
                this.states.drawBoard.drawContent();
            }
        });
    }

    public dragDetect() {
        console.log('drag detect');
        this.states.canvas.addEventListener('mousedown', (event) => {
            console.log('mousedown');
            this.mouseEvent.down = true;
            this.mouseEvent.up = false;
            this.mouseEvent.x = event.clientX;
            this.mouseEvent.y = event.clientY;
        });
        this.states.canvas.addEventListener('mouseup', (event) => {
            console.log('mouseup');
            this.mouseEvent.down = false;
            this.mouseEvent.up = true;
            this.mouseEvent.x = 0;
            this.mouseEvent.y = 0;
        });
        this.states.canvas.addEventListener('mousemove', (event) => {
           if(this.mouseEvent.down){
               // console.log('mousemove');
               this.dimensions.x += event.clientX - this.mouseEvent.x;
               this.dimensions.y += event.clientY - this.mouseEvent.y;
               this.mouseEvent.x = event.clientX;
               this.mouseEvent.y = event.clientY;
               if(this.redrawTimeoutId){
                   clearTimeout(this.redrawTimeoutId);
               }
               this.redrawTimeoutId = setTimeout(() => {
                    this.states.drawBoard.drawContent();
                }, 1);
           }
        });
        this.states.canvas.addEventListener('mouseleave', (event) => {
            if(this.mouseEvent.down){
                this.dimensions.x += event.clientX - this.mouseEvent.x;
                this.dimensions.y += event.clientY - this.mouseEvent.y;
                this.mouseEvent.x = event.clientX;
                this.mouseEvent.y = event.clientY;
                if(this.redrawTimeoutId){
                    clearTimeout(this.redrawTimeoutId);
                }
                this.redrawTimeoutId = setTimeout(() => {
                    this.states.drawBoard.drawContent();
                }, 10);
            }
            this.mouseEvent.down = false;
            this.mouseEvent.up = true;
            this.mouseEvent.x = 0;
            this.mouseEvent.y = 0;
        });
    }

    public setDimensions(x: number, y: number, width: number, height: number) {
        this.dimensions = {x: x, y: y, width: width, height: height};
    }

    public drawWindow() {
        if(!this.active) return;
        this.clickDetect();
        this.dragDetect();
        this.closeDetect();

        this.states.context.fillStyle = '#0000aa';
        this.states.context.fillRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, this.dimensions.height);

        this.states.context.fillStyle = '#aaaaaa';
        this.states.context.fillRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, 60);

        this.states.context.fillStyle = '#000';
        this.states.context.fillRect(this.dimensions.x + this.dimensions.width - 50, this.dimensions.y, 50, 60);
    }
}