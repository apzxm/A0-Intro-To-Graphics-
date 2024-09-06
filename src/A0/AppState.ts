import {
    ACallbackSwitch,
    AControllerInterface, AGLContext,
    AGLRenderWindow,
    AObject, AObjectState,
    ASceneController,
    ASceneModel,
    ClassInterface,
    PointerEvents
} from "../anigraph";
import {A0SceneModel} from "./A0SceneModel";
import {A0InputSceneController} from "./controllers/A0InputSceneController";
import {Mutex} from "async-mutex";
import {ConfirmInitialized} from "../anigraph/scene/ConfirmInitialized";

enum AppStateEnums{
    MAIN_RENDER_WINDOW="mainWindow",
    SECOND_RENDER_WINDOW="secondWindow"
}

export class AppState extends AObject implements ConfirmInitialized{
    static enums = AppStateEnums;
    @AObjectState columnSize:number;
    _initMutex:Mutex;
    renderWindows:{[name:string]:AGLRenderWindow}={};
    sceneModel:ASceneModel;

    constructor(){
        super();
        this._initMutex = new Mutex();
        this.columnSize=6;
        this.sceneModel = new A0SceneModel();
    }


    get mainRenderWindow(){
        return this.renderWindows[AppState.enums.MAIN_RENDER_WINDOW];
    }
    get secondRenderWindow(){
        return this.renderWindows[AppState.enums.SECOND_RENDER_WINDOW];
    }

    createMainRenderWindow(controllerClass:ClassInterface<ASceneController>){
        this.addRenderWindow(AppState.enums.MAIN_RENDER_WINDOW, controllerClass);
    }

    createSecondRenderWindow(controllerClass:ClassInterface<ASceneController>){
        this.addRenderWindow(AppState.enums.SECOND_RENDER_WINDOW, controllerClass);
    }

    addRenderWindow(name:string, controllerClass:ClassInterface<ASceneController>){
        let sceneController = new controllerClass(this.sceneModel);
        this.renderWindows[name]= new AGLRenderWindow(sceneController);
    }

    getSceneController(name:string){
        return this.renderWindows[name].sceneController;
    }

    init(){
        console.log("Initializing App State!")
    }

    get initMutex(){
        return this._initMutex;
    }
    async confirmInitialized(){
        const self = this;
        for(let window_name in this.renderWindows){
            await self.renderWindows[window_name].sceneController.confirmInitialized();
        }
        return self.initMutex.runExclusive(async () => {
            self.init();
        });
    }

    updateComponents(){
        this.sceneModel.signalComponentUpdate();
    }

    addComponentUpdateListener(callback:(self:AObject)=>void, handle?:string):ACallbackSwitch{
        return this.sceneModel.addComponentUpdateListener(callback, handle);
    }
}
