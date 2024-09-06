import {ASerializable} from "../../base";
import {AMaterialModelBase} from "./AMaterialModel";
import {LineMaterial, LineMaterialParameters} from "three/examples/jsm/lines/LineMaterial";
import * as THREE from "three";
import {Color} from "../../math";
import {AMaterial} from "./AMaterial";
import {AShaderModelBase} from "./AShaderModel";
import {DefaultMaterials} from "./MaterialConstants";
import {AThreeJSLineMaterial} from "./threeMaterials";

@ASerializable("ALineMaterialModel")
export class  ALineMaterialModel extends AMaterialModelBase<LineMaterialParameters>{
    static GlobalInstance:ALineMaterialModel;
    constructor() {
        super(
            DefaultMaterials.LineMaterial,
            LineMaterial,
            {},
            {
                // color: undefined,
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide,
                depthWrite: true,
                depthTest:true,
                linewidth: 0.005,
                vertexColors:true
            });
    }


    // _CreateTHREEJS(){
    //     return new AThreeJSLineMaterial({
    //         ...this.defaults,
    //         ...this.sharedParameters
    //     }, );
    // }

    get color(){
        return Color.FromThreeJS(this.sharedParameters['color']);
    }
    set color(c:Color){
        this.sharedParameters['color'] = c.asThreeJS();
    }
    getMaterialGUIParams(material:AMaterial){
        const self = this;

        return {
            // ...AMaterialModelBase.MaterialGUIColorControl(material),
            ...AMaterialModelBase.MaterialGUIControl(material, 'opacity', 1, {
                min:0,
                max:1,
                step:0.01
            }),
            // @ts-ignore
            ...AShaderModelBase.ShaderUniformGUIControl(material, 'linewidth', 1.0, {
                min:0,
                max:5,
                step:0.01
            })
        }
    }
}

ALineMaterialModel.GlobalInstance = new ALineMaterialModel();
