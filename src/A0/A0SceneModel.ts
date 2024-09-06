import {AMaterialManager, Vec2, Basic2DSceneModel, SVGAsset, ASceneModel} from "../anigraph";
import {AxesModel} from "./nodes/AxesModel";


export class A0SceneModel extends ASceneModel{
    /**
     * Declaring instance attributes for a class:
     * In Typescript you will declare a class's attributes up front as you see below.
     * Each attribute is declared with a name, followed by its type.
     *
     * Initializing attributes:
     * You can set initial values for some types of attributes, but be careful with this.
     * Don't do this for complicated objects or for decorated attributes (e.g., AObjectState)
     *
     * ```typescript
     * myVar:number=123;
     * ```
     *
     * You can simply declare the attribute, but if you do this you will have to be sure to initialize its value in your constructor.
     *
     * ```typescript
     * myVar:number;
     * constructor(){
     *     this.myVar = ...
     * }
     * ```
     *
     * Finally, you can use an exclamation mark `!` like below to tell the compiler to that you plan to initialize the value later on (e.g., in an init() function that gets called later):
     * ```typescript
     * myVar!:number;
     * ```
     */


    bgAsset!:SVGAsset;
    axesModel!:AxesModel;
    get screenScale(){
        return this.axesModel.screenScale;
    }


    /**
     * Here we are going to create getters and setters for xUnit and yUnit.
     * This will let us access two Vec2 objects with `mySceneModel.xUnit` and `mySceneModel.yUnit`
     * The getter is called whenever we try to read from `mySceneModel.xUnit`
     * the setter is called whenever we try to write to `mySceneModel.xUnit` in a single call.
     * So `mySceneModel.xUnit = V2(1,2)` will call the setter we wrote.
     * Note that `mySceneModel.xUnit.x` will only call the getter, though, because we are writing to a property of the
     * object, not to the address of the object itself.
     *
     * Below we use getters and setters to make myA1SceneModel.xUnit and myA1SceneModel.yUnit refer directly to the
     * corresponding property of the axesModel that we hold as an attribute of myA1SceneModel.
     */
    get xUnit():Vec2{
        return this.axesModel.xUnit;
    }
    set xUnit(value:Vec2){
        this.axesModel.xUnit = value;
    }


    get yUnit():Vec2{
        return this.axesModel.yUnit;
    }

    set yUnit(value:Vec2){
        this.axesModel.yUnit = value;
    }


    get targetPoint():Vec2{
        return this.axesModel.targetPoint;
    }

    set targetPoint(value:Vec2){
        this.axesModel.targetPoint = value;
    }

    get translation():Vec2{
        return this.axesModel.translation;
    }

    set translation(value:Vec2){
        this.axesModel.translation = value;
    }


    async PreloadAssets(){
        await this.loadShader(AMaterialManager.DefaultMaterials.RGBA_SHADER);
        await this.loadShader(AMaterialManager.DefaultMaterials.TEXTURED_SHADER)
        // this.bgAsset = await SVGAsset.Load("./images/svg/AbeToon.svg")
        // this.bgAsset = await SVGAsset.Load("./images/svg/Ghostscript_Tiger.svg");
        this.bgAsset = await SVGAsset.Load("./images/svg/axesWithTeapot.svg");
        // this.axesInAsset = await SVGAsset.Load("./images/svg/axes_light.svg")
        await super.PreloadAssets();
        this.initCamera()
    }


    initCamera() {
        this.initOrthographicCamera(AxesModel.DefaultGridScreenScale);
    }


    /**
     * Use this function to initialize the content of the scene.
     * Generally, this will involve creating instances of ANodeModel subclasses and adding them as children of the scene:
     * ```
     * let myNewModel = new MyModelClass(...);
     * this.addChild(myNewModel);
     * ```
     *
     * You may also want to add tags to your models, which provide an additional way to control how they are rendered
     * by the scene controller. See example code below.
     */
    initScene(){
        this.axesModel = AxesModel.FromSVGAsset(this.bgAsset);
        this.addChild(this.axesModel);
        this.signalComponentUpdate();
    }

    timeUpdate(t:number){
    }

}

