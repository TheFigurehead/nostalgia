export class Console {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private commands: string[];
    private dimensions: {x:number, y: number, width: number, height: number};

    private cursorPosition: number = 0;

    public active: boolean = false;

    private cursorBlinkBool: boolean = true;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this.commands = [''];

        this.clickDetect();
        this.keyDetect();
        this.setCursorPosition(this.commands.length-1);

        this.cursorBlink();
    }

    public setDimensions() {
        this.dimensions = {
            x: 0,
            y: this.canvas.height*0.7,
            width: this.canvas.width,
            height: this.canvas.height*0.3
        }
    }

    public setActive(active: boolean) {
        this.active = active;
    }

    public setCursorPosition(cursorPosition: number) {
        this.cursorPosition = cursorPosition;
    }

    public incrementCursorPosition() {
        this.cursorPosition++;
    }

    public drawConsole() {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, this.dimensions.y, this.dimensions.width, this.dimensions.height);

        this.drawConsoleCommands();
        this.cursorBlinkDraw();
    }

    private drawConsoleCommands() {
        for(let i = 0; i < this.commands.length; i++){
            this.context.font = "30px VT323";
            this.context.fillStyle = '#fff';
            this.context.fillText(this.commands[i], 30, this.dimensions.y + 30 + 30*i);
        }
    }

    private clickDetect() {
        this.canvas.addEventListener('click', (e) => {
            if(
                e.clientX > this.dimensions.x
                && e.clientX < this.dimensions.x + this.dimensions.width
                && e.clientY > this.dimensions.y
                && e.clientY < this.dimensions.y + this.dimensions.height
            ){
                // console.log(this.dimensions);
                // console.log(e.screenX, e.screenY);
                // console.log(e);
                // alert('Clicked console!');
                this.setActive(true);
                // this.commands.push('Clicked console!');
                this.drawConsole();
            }
        });
    }

    private keyDetect() {
        document.addEventListener('keydown', (e) => {
            if(this.active){
                this.keyPress(e);
            }
        });
    }

    private cursorBlink() {
        setInterval(() => {
            this.cursorBlinkBool = !this.cursorBlinkBool;
            this.drawConsole();
        }, 1000);
    }

    private cursorBlinkDraw() {
        if(!this.active) return;
        this.context.font = "30px VT323";
        this.context.fillStyle = (this.cursorBlinkBool) ? '#fff' : '#000';
        this.context.fillText(
            '_',
            this.context.measureText(this.commands[this.commands.length-1]).width + 35,
            this.dimensions.y + 35 + 30*this.cursorPosition
        );
    }

    private keyPress(e: KeyboardEvent) {
        if(e.key === 'Enter'){
            this.processCommand(this.commands[this.commands.length-1]);
            this.incrementCursorPosition();
        }else{
            this.commands[this.commands.length-1] = this.commands[this.commands.length-1] + e.key;
        }
        this.drawConsole();
    }

    private processCommand(command: string) {
        const commandArray = command.split(' ');
        const commandName = commandArray[0];
        const commandArgs = commandArray.slice(1);

        switch(commandName){
            case 'help':
                this.commands.push('help - display this help');
                this.commands.push('');
                this.incrementCursorPosition();
                break;
            case 'clear':
                this.commands = [''];
                this.cursorPosition = 0;
                break;
            case 'echo':
                this.commands.push(commandArgs.join(' '));
                this.commands.push('');
                this.incrementCursorPosition();
                break;
            default:
                this.commands.push('Command not found: ' + commandName);
                this.commands.push('');
                this.incrementCursorPosition();
        }
        console.log(this.commands)
    }
}