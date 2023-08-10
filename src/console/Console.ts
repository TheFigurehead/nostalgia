import {App} from "../App";
import {States} from "../States";
import {AppWindow} from "../window/Base";

export class Console {

    private commands: string[] = [
        'Hello World 1',
        'Hello World 2',
        'Hello World 3',
        'Hello World 4',
        'Hello World 5',
        'Hello World 6',
        'Hello World 7',
        'Hello World 8',
        'Hello World 9',
        'Hello World 10',
        'Hello World 11',
        'Hello World 12',
        'Hello World 13',
        'Hello World 14',
        'Hello World 15',
        'Hello World 16',
        'Hello World 17',
        'Hello World 18',
        'Hello World 19',
        'Hello World 20',
        'Hello World 21',
        'Hello World 22',
        'Hello World 23',
        'Hello World 24',
        'Hello World 25',
        'Hello World 26',
        ''
    ];

    private lines: number = 20;

    private currentLine = this.commands.length-1;

    private cursorPosition: number = this.lines-1;
    // private cursorPosition: number = 0;

    public active: boolean = false;

    public states: States = States.getInstance();

    private cursorBlinkTimeoutId: NodeJS.Timeout;

    private cursorBlinkBool: boolean = true;

    private dimensions: {x:number, y: number, width: number, height: number};

    private lineHeight: number;

    private keyHandlerOn: boolean = false;

    private scroll: any = {
        x: 0,
        y: 0,
        height: 0,
        width: 0
    }

    private viewCommandStart: number = 0;

    constructor() {
    }

    public init() {
        // this.commands = [''];

        this.clickDetect();
        this.keyDetect();
        this.scrollInteract();
        // this.setCursorPosition(this.commands.length-1);

        if(!this.cursorBlinkTimeoutId) this.cursorBlink();

        this.setActive(true);

        this.lineHeight = this.dimensions.height/(this.lines) * 0.95;
    }

    public setDimensions(x: number, y: number, width: number, height: number) {
        this.dimensions = {
            x: x,
            y: y,
            width: width,
            height: height
        }
    }

    public setActive(active: boolean) {
        this.active = active;
    }

    public setCursorPosition(cursorPosition: number) {
        this.cursorPosition = cursorPosition;
    }

    public incrementCursorPosition() {
        this.currentLine++;
        if(this.currentLine >= this.lines-1){
            this.viewCommandStart++;
            this.cursorPosition = this.lines -1;
            return;
        }
        this.cursorPosition++;
    }

    public drawConsole() {

        this.states.context.fillStyle = '#000';
        this.states.context.fillRect(0, this.dimensions.y, this.dimensions.width, this.dimensions.height);

        this.drawScroll();

        this.drawConsoleCommands();
        this.cursorBlinkDraw();

    }

    private drawConsoleCommands() {
        // const start = Math.max(this.commands.length - this.lines, 0);
        // const visibleCommands = this.commands.slice(-this.lines);
        const visibleCommands = this.commands.slice(this.viewCommandStart, this.viewCommandStart + this.lines);
        for(let i = 0; i < visibleCommands.length; i++){
            this.states.context.font = `${this.lineHeight}px VT323`;
            this.states.context.fillStyle = '#fff';
            this.states.context.fillText(visibleCommands[i], 30, this.dimensions.y + this.lineHeight + this.lineHeight*i);
        }
    }

    private clickDetect() {
        this.states.canvas.addEventListener('click', (e) => {
            if(
                e.clientX > this.dimensions.x
                && e.clientX < this.dimensions.x + this.dimensions.width
                && e.clientY > this.dimensions.y
                && e.clientY < this.dimensions.y + this.dimensions.height
            ){
                this.setActive(true);
                this.states.drawBoard.drawContent();
            }else{
                this.setActive(false);
            }
        });
    }

    private keyDetect() {
        if(this.keyHandlerOn) return;
        this.keyHandlerOn = true;
        document.addEventListener('keydown', (e) => {
            if(this.active){
                this.viewCommandStart = Math.max(this.commands.length - this.lines, 0);
                this.keyPress(e);
            }
        });
    }

    private cursorBlink() {
        this.cursorBlinkTimeoutId = setInterval(() => {
            this.cursorBlinkBool = !this.cursorBlinkBool;
            this.states.drawBoard.drawContent();
        }, 500);
    }

    private cursorBlinkDraw() {
        if(this.viewCommandStart + this.lines < this.currentLine) return;
        this.states.context.font = `${this.lineHeight}px VT323`;
        this.states.context.fillStyle = (this.cursorBlinkBool) ? '#fff' : '#000';
        this.states.context.fillText(
            '_',
            this.states.context.measureText(this.commands[this.commands.length-1]).width + 35,
            this.dimensions.y + 35 + this.lineHeight*this.cursorPosition
        );
    }

    private keyPress(e: KeyboardEvent) {
        switch (e.key) {
            case 'Enter':
                this.processCommand(this.commands[this.commands.length-1]);
                this.incrementCursorPosition();
                break;
            case 'Backspace':
                if(this.commands[this.commands.length-1].length > 0){
                    this.commands[this.commands.length-1] = this.commands[this.commands.length-1].slice(0, -1);
                }
                break;
            case 'Alt':
            case 'Control':
            case 'Shift':
            case 'Meta':
            case 'Tab':
            case 'CapsLock':
            case 'Escape':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'F1':
            case 'F2':
            case 'F3':
            case 'F4':
            case 'F5':
            case 'F6':
            case 'F7':
            case 'F8':
            case 'F9':
            case 'F10':
            case 'F11':
            case 'F12':
            case 'Insert':
            case 'Delete':
            case 'Home':
            case 'End':
            case 'PageUp':
            case 'PageDown':
            case 'NumLock':
            case 'ScrollLock':
            case 'Pause':
            case 'ContextMenu':
            case 'PrintScreen':
                break;
            default:
                this.commands[this.commands.length-1] = this.commands[this.commands.length-1] + e.key;

        }
        this.states.drawBoard.drawContent();
    }

    public processCommand(command: string) {
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
                this.currentLine = 0;
                break;
            case 'echo':
                this.commands.push(commandArgs.join(' '));
                this.commands.push('');
                this.incrementCursorPosition();
                break;
            case 'run':
                // this.commands.push(commandArgs.join(' '));
                if(commandArgs[0]){
                    if(this.states.windows[commandArgs[0]]){
                        this.commands.push('Window already exists: ' + commandArgs[0]);
                        this.incrementCursorPosition();
                    }else{
                        const window = new AppWindow(commandArgs[0]);
                        window.setDimensions(50, 50, 550, 550);
                        window.drawWindow();
                        this.states.addWindow(commandArgs[0], window);
                    }
                }else{
                    this.commands.push('Window name required');
                    this.incrementCursorPosition();
                }
                this.commands.push('');
                // this.incrementCursorPosition();
                break;
            case 'close':
                this.commands.push(commandArgs.join(' '));
                this.commands.push('');

                this.states.windows = {};

                this.states.drawBoard.drawContent();

                this.incrementCursorPosition();
                break;
            default:
                this.commands.push('Command not found: ' + commandName);
                this.commands.push('');
                this.incrementCursorPosition();
        }
    }

    public drawScroll(){
        this.states.context.fillStyle = '#e6e6e6';
        this.states.context.strokeStyle = '#e6e6e6';
        this.states.context.fillRect(this.dimensions.width-20, this.dimensions.y, 20, this.dimensions.height);

        const scrollHeight = this.dimensions.height * (this.lines / this.commands.length);
        const scrollY = this.dimensions.y + (this.dimensions.height * (this.viewCommandStart / this.commands.length));

        this.states.context.fillStyle = '#666';
        this.states.context.fillRect(this.dimensions.width-20, scrollY, 20, scrollHeight);

        this.scroll = {
            x: this.dimensions.width-20,
            y: scrollY,
            height: scrollHeight,
            width: 20
        }
    }

    scrollInteract(){

        let scrollDrag = false;
        let scrollDragStart = 0;

        document.addEventListener('wheel', (e) => {
            if(
                e.clientX > this.dimensions.x
                && e.clientX < this.dimensions.x + this.dimensions.width
                && e.clientY > this.dimensions.y
                && e.clientY < this.dimensions.y + this.dimensions.height
            ){
                if(e.deltaY > 0){
                    this.viewCommandStart = (this.viewCommandStart + 1 > this.commands.length - this.lines) ? this.commands.length - this.lines : this.viewCommandStart + 1;
                }else{
                    this.viewCommandStart = (this.viewCommandStart - 1 < 0) ? 0 : this.viewCommandStart - 1;
                }
                this.states.drawBoard.drawContent();
            }
        });

        document.addEventListener('mousedown', (e) => {
            if(
                e.clientX > this.scroll.x
                && e.clientX < this.scroll.x + this.scroll.width
                && e.clientY > this.scroll.y
                && e.clientY < this.scroll.y + this.scroll.height
            ){
                scrollDrag = true;
                scrollDragStart = e.clientY;
            }
        });

        document.addEventListener('mouseup', (e) => {
            scrollDrag = false;
        });

        document.addEventListener('mousemove', (e) => {
            if(scrollDrag){
                const scrollDelta = e.clientY - scrollDragStart;
                const scrollDeltaPercent = scrollDelta / this.dimensions.height;
                const scrollDeltaCommands = scrollDeltaPercent * this.commands.length;

                this.viewCommandStart = (this.viewCommandStart + scrollDeltaCommands > this.commands.length - this.lines) ? this.commands.length - this.lines : this.viewCommandStart + scrollDeltaCommands;
                this.viewCommandStart = (this.viewCommandStart + scrollDeltaCommands < 0) ? 0 : this.viewCommandStart + scrollDeltaCommands;

                scrollDragStart = e.clientY;

                this.states.drawBoard.drawContent();
            }
        });

        this.states.canvas.addEventListener('mousemove', (e) => {
            if(
                e.clientX > this.scroll.x
                && e.clientX < this.scroll.x + this.scroll.width
                && e.clientY > this.scroll.y
                && e.clientY < this.scroll.y + this.scroll.height
            ){
                this.states.canvas.style.cursor = 'pointer';
            }else{
                this.states.canvas.style.cursor = 'default';
            }
        });
    }
}