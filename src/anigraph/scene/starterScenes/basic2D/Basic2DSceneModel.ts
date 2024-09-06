import {ASceneModel} from "../../index";

export abstract class Basic2DSceneModel extends ASceneModel {


    createLineShaderMaterial() {
        return this.materials.createLineShaderMaterial();
    }

    abstract timeUpdate(t: number): void;
}
