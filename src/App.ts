import { AppWindow } from './window/Base';
import { Console } from './console/Console';
import { DrawBoard } from './gui/DrawBoard';
import {States} from "./States";

export class App {

    public states: States = States.getInstance();

    public instance: App;
    constructor() {
        if(!this.instance){

            this.instance = this;

            this.states.setDrawBoard(new DrawBoard());

            this.states.setConsole(new Console());
            // this.states.addWindow(new AppWindow());

            // const window1 = new AppWindow();
            // window1.setDimensions(50, 50, 550, 550);
            // const window2 = new AppWindow();
            // window2.setDimensions(850, 120, 550, 550);
            //
            // this.states.addWindow(window1);
            // this.states.addWindow(window2);

        }

        // const consoleObj = new Console();
        // const window = new AppWindow();

        // this.drawBoard.init();

        // console.log('App is running');
        return this.instance;
    }

    public init() {

        this.states.drawBoard.init();
        this.states.console.init();

    }

}