import {
    ALineMaterialModel,
    ANodeModel3D,
    AObjectState,
    ASerializable, Mat3,
    V2,
    Vec2, Vec3
} from "../../anigraph";
import {SVGAsset} from "../../anigraph/svg/SVGAsset";
import {AppConfig} from "../AppConfig";




@ASerializable("AxesModel")
export class AxesModel extends ANodeModel3D {
    static DefaultGridScreenScale=AppConfig.ScreenScale;
    bgAsset!:SVGAsset;
    @AObjectState showBG:boolean;
    @AObjectState xUnit!:Vec2;
    @AObjectState yUnit!:Vec2;
    @AObjectState translation!:Vec2;
    @AObjectState targetPoint!:Vec2;
    screenScale:number;
    unitScale:number;

    static LineMaterialModel:ALineMaterialModel;

    static FromSVGAsset(asset:SVGAsset, screenScale?:number, unitScale?:number){
        return new AxesModel(asset, screenScale, unitScale);
    }


    constructor(bgAsset?:SVGAsset, screenScale?:number, unitScale?:number) {
        super();
        this.showBG = true;
        if(bgAsset) {
            this._setBGAsset(bgAsset);
        }
        this.setMaterial(AxesModel.LineMaterialModel.CreateMaterial());
        this.screenScale = screenScale??AxesModel.DefaultGridScreenScale;
        this.unitScale = unitScale??1.0;
        this.xUnit = new Vec2(1.0, 0.0);
        this.yUnit = new Vec2(0.0, 1.0);
        this.translation = new Vec2(0.0,0.0);
        // this.scale = scale??1.0;
        this.resetScale();
    }

    getMatrix():Mat3{
        return Mat3.FromColumns(Vec3.FromVec2(this.xUnit),Vec3.FromVec2(this.yUnit),Vec3.From2DHPoint(this.translation))
    }

    _setBGAsset(svgAsset:SVGAsset){
        this.bgAsset=svgAsset;
        this.geometry.addMember(this.bgAsset);
    }

    resetScale(){
        this.targetPoint = V2(this.unitScale, this.unitScale);
        this.xUnit = V2(this.unitScale, 0);
        this.yUnit = V2(0, this.unitScale);
    }

}

AxesModel.LineMaterialModel = ALineMaterialModel.GlobalInstance;

