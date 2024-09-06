import {ASVGGraphic} from "../../anigraph";
import {AxesModel} from "./AxesModel";
import {
    ANodeView,
    ASerializable,
    AThreeJSLineMaterial,
    Color,
    Mat3,
    Mat4,
    V2,
    Vec2,
    VertexArray2D
} from "../../anigraph";
import {Arrow2DGraphic} from "../../anigraph/rendering/graphicelements/Arrow2DGraphic";
import {Mat2} from "../math";
import {GridGraphic} from "../../anigraph/rendering/graphicelements/GridGraphic";

function _getArrowVerts(start:Vec2, end:Vec2, color:Color) {
    return VertexArray2D.FromLists(
        [
            start,
            end
        ],
        [
            color,
            color
        ]
    )
}



@ASerializable("AxesView")
export class AxesViewAffine extends ANodeView {
    axesGraphic!:GridGraphic;
    axesTransform!: Mat4;
    // Optionally for visualizing the pre-transformation axes
    bgGraphic!:ASVGGraphic;
    vectorMaterial!: AThreeJSLineMaterial;


    get axesScale(){
        return this.model.screenScale;
    }
    unitXGraphic!: Arrow2DGraphic;
    unitYGraphic!: Arrow2DGraphic;
    targetVectorGraphic!: Arrow2DGraphic;
    _arrowheadSize:number=0.1;

    get arrowheadSize(){return this._arrowheadSize;}
    set arrowheadSize(size:number){
        this._arrowheadSize = size;
        this.unitXGraphic.arrowHeadSize=this._arrowheadSize;
        this.unitYGraphic.arrowHeadSize=this._arrowheadSize;
        this.targetVectorGraphic.arrowHeadSize=this._arrowheadSize;
    }

    _update!: (view: AxesViewAffine, ...args: any[]) => void;

    update(): void {
        this._update(this);
        this.bgGraphic.visible = this.model.showBG;
    }

    setAxesTransform(m: Mat3) {
        // @ts-ignore
        // this.axesTransform = new Mat4(m.m00, m.m01, 0, m.m02, m.m10, m.m11, 0, m.m12,
        //     0, 0, 1, 0,
        //     0, 0, 0, 1
        // )
        this.axesTransform = new Mat4(m.m00, m.m01, 0, m.m02,
            m.m10, m.m11, 0, m.m12,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
        this.axesGraphic.setTransform(this.axesTransform.times(this.model.transform.getMatrix()));
        if(this.bgGraphic) {
            this.bgGraphic.setTransform(this.axesTransform.times(this.model.transform.getMatrix()))
        }
    }

    setXUnitVector(start: Vec2, end: Vec2, color?:Color) {
        this.unitXGraphic.setVerts(
            _getArrowVerts(start, end, color??Color.FromRGBA(1.0,0.0,0.0,1.0))
        )
    }

    setYUnitVector(start: Vec2, end: Vec2, color?:Color) {
        this.unitYGraphic.setVerts(
            _getArrowVerts(start, end, color??Color.FromRGBA(0.0,1.0,0.0,1.0))
        )
    }

    setTargetVector(start: Vec2, end: Vec2, color?:Color) {
        this.targetVectorGraphic.setVerts(
            _getArrowVerts(start, end, color??Color.FromRGBA(0.0,0.0,1.0,1.0))
        )
    }

    protected constructor() {
        super();
    }

    static Create(model: AxesModel, update: (view: AxesViewAffine, ...args: any[]) => void) {
        let view = new this();
        view._update = update;
        view.setModel(model);
        view.update();
        return view;
    }

    get model(): AxesModel {
        return this._model as AxesModel;
    }



    getOrigin() {
        return V2();
    }

    _initBackgroundGraphic(){
        if(this.model.bgAsset) {
            this.bgGraphic = ASVGGraphic.Create(this.model.bgAsset);
            let s = this.axesScale;
            // let s = 30;
            this.bgGraphic.setSourceTransform(new Mat4(
                s, 0, 0, 0,
                0, s, 0, -0.0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ))

            this.addGraphic(this.bgGraphic);
        }
    }

    _initAxesGraphic(){
        let brightness = 0.5
        this.axesGraphic = new GridGraphic(30, 30, this.model.material, Color.FromRGBA(brightness, brightness, brightness,0.25), 0.006);

        this.axesGraphic.setTransform(new Mat4(
            this.axesScale,0,0,0,
            0,this.axesScale,0,0,
            0,0,1,0,
            0,0,0,1
        ))
        this.addGraphic(this.axesGraphic);
    }

    _initArrowGraphics(){
        this.vectorMaterial = AxesModel.LineMaterialModel.CreateMaterial()._material as AThreeJSLineMaterial;
        this.vectorMaterial.linewidth = 0.01;
        this.unitXGraphic = Arrow2DGraphic.Create(
            _getArrowVerts(this.getOrigin(), this.model.xUnit, Color.FromRGBA(1.0,0.0,0.0,1.0)),
            this.vectorMaterial
        )

        this.unitYGraphic = Arrow2DGraphic.Create(
            _getArrowVerts(this.getOrigin(), this.model.yUnit, Color.FromRGBA(0.0,1.0,0.0,1.0)),
            this.vectorMaterial
        )

        this.targetVectorGraphic = Arrow2DGraphic.Create(
            _getArrowVerts(this.getOrigin(), this.model.targetPoint, Color.FromRGBA(0.0,0.0,1.0,1.0)),
            this.vectorMaterial
        )

        this.arrowheadSize = this._arrowheadSize;
        this.addGraphic(this.unitXGraphic);
        this.addGraphic(this.unitYGraphic);
        this.addGraphic(this.targetVectorGraphic);
    }

    init() {
        this._initBackgroundGraphic();
        this._initAxesGraphic();
        this._initArrowGraphics();
        this.update();
    }



    dispose() {
        super.dispose();
        this.vectorMaterial.dispose();
    }

}



