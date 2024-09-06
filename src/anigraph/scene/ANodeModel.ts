import {AObjectState, AObject, ACallbackSwitch, HasTags} from "../base";
import {AModel} from "../base/amvc/AModel";
import {
    AGeometrySet,
    BoundingBox2D,
    BoundingBox3D,
    Color,
    HasBounds,
    NodeTransform, NodeTransform2D,
    NodeTransform3D,
    VertexArray, VertexArray2D,
    VertexArray3D
} from "../math";
import {AMaterial} from "../rendering/material";

const MATERIAL_UPDATE_SUBSCRIPTION_HANDLE = 'MATERIAL_UPDATE_SUBSCRIPTION_SceneNodeModel';

enum ANodeModelEvents{
    GEOMETRY_UPDATE = "GEOMETRY_UPDATE",
}

export abstract class ANodeModel extends AModel implements HasBounds, HasTags{
    @AObjectState protected _transform!:NodeTransform3D;
    @AObjectState color!:Color;
    @AObjectState _nodeTags!:{[tagName:string]:any};
    protected getNodeTags(){return this._nodeTags;}

    addTag(tagName:string){
        this._nodeTags[tagName]=true;
    }

    setTagValue(tagName:string, value:any){
        this._nodeTags[tagName]=value;
    }

    hasTag(tagName:string){
        return (tagName in this._nodeTags);
    }

    getTagValue(tagName:string){
        return this._nodeTags[tagName];
    }

    removeTag(tagName:string){
        delete this._nodeTags[tagName];
    }

    static NodeModelEvents = ANodeModelEvents;
    protected _geometry!:AGeometrySet;
    get geometry(){return this._geometry;}
    abstract get verts():VertexArray<any>;
    abstract get transform():NodeTransform<any, any>

    abstract setVerts(verts:VertexArray<any>):void;
    abstract setTransform(transform:NodeTransform<any, any>):void;

    // get verts():VertexArray<any>{return _verts;}

    protected _material!:AMaterial;
    get material(){return this._material;}
    // get transform(){return this._transform;}
    // setTransform(t:NodeTransform3D){this._transform=t;}
    // protected set transform(t:NodeTransform3D){
    //     this.setTransform(t);
    // }


    constructor() {
        super();
        this._nodeTags = [];
        this._geometry = new AGeometrySet();
        this.signalGeometryUpdate = this.signalGeometryUpdate.bind(this);
    }


    // init(){
    //     this.verts = new GeometrySet();
    //     this._transform = new NodeTransform3D();
    //     this.color = Color.Random();
    // }


    //##################//--Listeners--\\##################
    //<editor-fold desc="Listeners">

    addColorListener(callback:(self:AObject)=>void, handle?:string, synchronous:boolean=true){
        return this.addStateKeyListener('color', callback, handle, synchronous);
    }

    addMaterialUpdateListener(callback:(...args:any[])=>void, handle?:string){
        return this.addEventListener(AMaterial.Events.UPDATE, callback, handle);
    }
    addMaterialChangeListener(callback:(...args:any[])=>void, handle?:string){
        return this.addEventListener(AMaterial.Events.CHANGE, callback, handle);
    }

    addTransformListener(callback:(self:AObject)=>void, handle?:string, synchronous:boolean=true):ACallbackSwitch{
        return this.addStateKeyListener('_transform', callback, handle, synchronous);
    }

    addGeometryListener(callback:(self:AObject)=>void, handle?:string, synchronous:boolean=true){
        // return this.addStateKeyListener('verts', callback, handle, synchronous);
        // return this.addStateKeyListener('verts', callback, handle, synchronous);
        return this.addEventListener(ANodeModel.NodeModelEvents.GEOMETRY_UPDATE, callback, handle);
    }

    signalGeometryUpdate(){
        this.signalEvent(ANodeModel.NodeModelEvents.GEOMETRY_UPDATE, this);
    }

    // signalMaterialUpdate(){
    //     this.signalEvent(ANodeModel.NodeModelEvents.MATERIAL_UPDATE, this);
    // }
    //</editor-fold>
    //##################\\--Listeners--//##################

    //##################//--Material Updates--\\##################
    //<editor-fold desc="Material Updates">
    setMaterial(material:AMaterial|string){
        if(this.material === material){
            return;
        }else{
            let amaterial:AMaterial;
            if(material instanceof AMaterial){
                amaterial=material;
            }else{
                throw new Error("Material from string not implemented yet. Should look up in MaterialManager.")
                // amaterial = GetAppState().CreateMaterial(material);
            }
            let color = this.color;
            if(this.material){
                this._disposeMaterial()
            }
            this._material = amaterial;
            if(color) {
                this._material.setModelColor(color);
            }
            this.setMaterialUpdateSubscriptions();
        }
        this.signalEvent(AMaterial.Events.CHANGE)
    }

    _disposeMaterial(){
        this.unsubscribe(MATERIAL_UPDATE_SUBSCRIPTION_HANDLE);
        this.material.release();
    }


    onMaterialUpdate(...args:any[]){
        this.signalEvent(AMaterial.Events.UPDATE, ...args);
    }

    setMaterialUpdateSubscriptions(){
        const self = this;
        this.subscribe(this.material.addEventListener(AMaterial.Events.UPDATE, (...args:any[])=>{
            self.onMaterialUpdate(AMaterial.Events.UPDATE, ...args)
        }), MATERIAL_UPDATE_SUBSCRIPTION_HANDLE);
        this.material.subscribe(this.addStateKeyListener('color', ()=>{
            self.material.setModelColor(self.color);
            if('opacity' in self.material._material) self.material.setValue('opacity', self.color.a);
        }))
    }
    //</editor-fold>
    //##################\\--Material Updates--//##################

    /**
     * Right now, bounds are only transformed by the model's current (local) transform
     * @returns {BoundingBox3D}
     */
    getBounds(): BoundingBox3D {
        let b = this.verts.getBounds();
        b.transform = this._transform;
        return b;
    }

    /**
     * Right now, bounds are only transformed by the model's current (local) transform
     * @returns {BoundingBox3D}
     */
    getBoundsXY(): BoundingBox2D {
        return this.getBounds().getBoundsXY();
    }

}



export class ANodeModel3D extends ANodeModel{
    get transform(): NodeTransform3D {
        return this._transform;
    }


    setTransform(t:NodeTransform3D){this._transform=t;}
    protected set transform(t:NodeTransform3D){
        this.setTransform(t);
    }

    get verts(): VertexArray3D {
        return this._geometry.verts as VertexArray3D;
    }

    _setVerts(verts: VertexArray3D) {
        this._geometry.verts=verts;
    }
    setVerts(verts: VertexArray3D) {
        this._setVerts(verts);
        this.signalGeometryUpdate();
    }

    constructor() {
        super();
        this._transform = new NodeTransform3D();
        this.color = Color.Random();
        this._setVerts(new VertexArray3D());
    }
}

export class ANodeModel2D extends ANodeModel{
    constructor() {
        super();
        this._transform = new NodeTransform3D();
        this.color = Color.Random();
        this._setVerts(new VertexArray2D());
    }

    get transform(): NodeTransform3D {
        return this._transform;
    }

    setTransform(t:NodeTransform3D){this._transform=t;}
    protected set transform(t:NodeTransform3D){
        this.setTransform(t);
    }

    get verts(): VertexArray2D {
        return this._geometry.verts as VertexArray2D;
    }
    _setVerts(verts: VertexArray2D) {
        this._geometry.verts=verts;
    }
    setVerts(verts: VertexArray2D) {
        this._setVerts(verts);
        this.signalGeometryUpdate();
    }
}

