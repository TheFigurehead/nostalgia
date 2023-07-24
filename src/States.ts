import {AppWindow} from "./window/Base";
import {Console} from "./console/Console";
import {DrawBoard} from "./gui/DrawBoard";
import {Workbench} from "./workbench/Workbench";

export class States {
    public static instance: States;

    public windows: {  [key: string]: AppWindow } = {};
    public console: Console;
    public drawBoard: DrawBoard;
    public workbench: Workbench;

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    constructor() {
        if(!States.instance){
            States.instance = this;
        }
        return States.instance;
    }

    public static getInstance(): States {
        if (!States.instance) {
            States.instance = new States();
        }

        return States.instance;
    }

    public setConsole(console: Console) {
        this.console = console;
    }
    public addWindow(name: string, window: AppWindow) {
        this.windows[name] = window;
    }
    removeWindow(name: string) {
        delete this.windows[name];
    }
    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }
    public setContext(context: CanvasRenderingContext2D) {
        this.context = context;
    }
    public setDrawBoard(drawBoard: DrawBoard) {
        this.drawBoard = drawBoard;
    }
    setWorkbench(workbench: Workbench) {
        this.workbench = workbench;
    }
}