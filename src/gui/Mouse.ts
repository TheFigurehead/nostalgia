type Bounds = {
    x: number,
    y: number,
    width: number,
    height: number,
    priority: number,
    cursor?: string
}

export class Mouse{

    public static instance: Mouse;
    public bounds: Bounds[] = [];

    constructor() {
        if(!Mouse.instance){
            Mouse.instance = this;
            this.setDefaultBounds();
            this.onMouseMove();
        }
        return Mouse.instance;
    }

    public x: number = 0;
    public y: number = 0;

    public cursor: string = 'default';

    setDefaultBounds() {
        this.bounds.push({
            x: 0,
            y: 0,
            width: 10000,
            height: 10000,
            priority: 0,
            cursor: 'default'
        })
    }

    setCursor(cursor: string = 'default') {
        this.cursor = cursor;
    }

    onMouseMove() {
        document.addEventListener('mousemove', (event) => {
            this.x = event.clientX;
            this.y = event.clientY;
            this.checkBounds();
        });
    }

    checkBounds() {
        // console.log('check bounds', this.bounds);
        this.bounds.sort((a: Bounds, b: Bounds) => {
            return b.priority - a.priority;
        });
        for(let i = 0; i < this.bounds.length; i++){
            console.log('bound: ', this.bounds[i])
            if(
                this.x >= this.bounds[i].x &&
                this.x <= this.bounds[i].x + this.bounds[i].width &&
                this.y >= this.bounds[i].y &&
                this.y <= this.bounds[i].y + this.bounds[i].height
            ){
                this.setCursor(this.bounds[i].cursor);
                break;
            }
        }
        document.body.style.cursor = this.cursor;
    }

    addBounds(x: number, y: number, width: number, height: number, priority: number, cursor: string = 'default') {
        this.bounds.push({
            x: x,
            y: y,
            width: width,
            height: height,
            priority: priority,
            cursor: cursor
        });
    }

}