import {A0SceneModel} from "../A0SceneModel";
import * as THREE from "three";
import {
    ADragInteraction,
    AGLContext,
    AInteractionEvent,
    AKeyboardInteraction,
    ANodeModel,
    ANodeView,
    Vector2DModel, Vector2DView, Basic2DSceneController
} from "../../anigraph";

export abstract class TransformVisSceneController extends Basic2DSceneController{
    get model():A0SceneModel{
        return this._model as A0SceneModel;
    }

    initModelViewSpecs() {
        this.addModelViewSpec(Vector2DModel, Vector2DView);
    }

    async initScene() {
        // You can set the clear color for the rendering context
        this.renderer.setClearColor(new THREE.Color(1.0,1.0,1.0));
        this.renderer.clear();
        super.initScene();
    }

    abstract onClick(event:AInteractionEvent):void;
    abstract onKeyDown(event:AInteractionEvent, interaction:AKeyboardInteraction):void;
    abstract onKeyUp(event:AInteractionEvent, interaction:AKeyboardInteraction):void;
    abstract dragStartCallback(event:AInteractionEvent, interaction?:ADragInteraction):void;
    abstract dragMoveCallback(event:AInteractionEvent, interaction?:ADragInteraction):void
    abstract dragEndCallback(event:AInteractionEvent, interaction?:ADragInteraction):void


    /**
     * This function will be called every time a new node model is added to the scene model.
     * It should create and return a view for the given model.
     * @param nodeModel
     * @returns {LineSegmentsView2D | QuickNodeView | ASVGView | LineView2D | AMeshNodeView}
     */
    createViewForNodeModel(nodeModel: ANodeModel): ANodeView {
        return super.createViewForNodeModel(nodeModel);
    }


    onAnimationFrameCallback(context:AGLContext) {
        // render the scene view
        context.renderer.clear();
        context.renderer.render(this.view.threejs, this._threeCamera);
    }

}


