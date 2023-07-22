export class AppWindow {
    public active: boolean = true;
    public dimensions = {x:50, y: 50, width: 550, height: 550};
    public context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public drawWindow() {
        this.context.fillStyle = '#0000aa';
        this.context.fillRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, this.dimensions.height);

        this.context.fillStyle = '#aaaaaa';
        this.context.fillRect(this.dimensions.x, this.dimensions.y, this.dimensions.width, 60);
    }
}