import {TransformVisSceneController} from "../TransformVisSceneController";
import {
    ADragInteraction,
    AGLRenderWindow,
    AInteractionEvent,
    AKeyboardInteraction,
    ANodeModel,
    ANodeView,
    V2
} from "../../../anigraph";
import {AxesModel, AxesView} from "../../nodes";
import {Mat2} from "../../math";

export let mouseXBasisV: number[];
export let mouseYBasisV: number[];

export class A0TransformedSceneControllerAffine extends TransformVisSceneController{
    createViewForNodeModel(nodeModel: ANodeModel): ANodeView {
        if(nodeModel instanceof AxesModel){
            return AxesView.Create(nodeModel,
                (view:AxesView)=>{
                    let axisTransform = view.model.getMatrix();
                    view.setAxesTransform(axisTransform);
                    view.setXUnitVector(view.model.translation, view.model.translation.plus(view.model.xUnit));
                    view.setYUnitVector(view.model.translation, view.model.translation.plus(view.model.yUnit));
                    view.setTargetVector(V2(), view.model.translation);
                    view.targetVectorGraphic.visible=true;
            })
        }
        return super.createViewForNodeModel(nodeModel);
    }

    onClick(event:AInteractionEvent){
        this.eventTarget.focus();
        let cursorPosition = event.ndcCursor?.times(this.model.screenScale);

        if(cursorPosition) {
            if (this.keyboardInteraction.keysDownState['x']) {
                this.model.xUnit = cursorPosition.minus(this.model.translation);
                mouseXBasisV = [cursorPosition.elements[0], cursorPosition.elements[1]];
            } else if (this.keyboardInteraction.keysDownState['y']) {
                this.model.yUnit = cursorPosition.minus(this.model.translation);
                mouseYBasisV = [cursorPosition.elements[0], cursorPosition.elements[1]];
            } else {
                let axisTransform = Mat2.FromColumns(this.model.xUnit, this.model.yUnit);
                this.model.targetPoint = cursorPosition;
                this.model.translation = this.model.targetPoint;
            }
            if(event.shiftKey){
                this.model.xUnit = this.model.xUnit.getNormalized();
                this.model.yUnit = this.model.yUnit.getNormalized();
            }
        }
        this.model.signalComponentUpdate();
    }

    onKeyDown(event:AInteractionEvent, interaction:AKeyboardInteraction){
        console.log(`Key ${event.key} was pressed.`)
        if(event.key==='R'){
            this.model.axesModel.resetScale();
        }
        if(event.key==='I'){
            this.model.axesModel.showBG = !this.model.axesModel.showBG;
        }
    }

    onKeyUp(event:AInteractionEvent, interaction:AKeyboardInteraction){}

    dragStartCallback(event:AInteractionEvent, interaction?:ADragInteraction){};
    dragMoveCallback(event:AInteractionEvent, interaction?:ADragInteraction){
        let cursorPosition = event.ndcCursor?.times(this.model.screenScale);
        if(cursorPosition) {
            if(event.shiftKey){
                let cpoint = cursorPosition.minus(this.model.translation);
                this.model.xUnit = cpoint.getNormalized();
                this.model.yUnit = this.model.yUnit.getNormalized();
            }
            if (this.keyboardInteraction.keysDownState['x']) {
                this.model.xUnit = cursorPosition.minus(this.model.translation);
                mouseXBasisV = [cursorPosition.elements[0], cursorPosition.elements[1]];
            } else if (this.keyboardInteraction.keysDownState['y']) {
                this.model.yUnit = cursorPosition.minus(this.model.translation);
                mouseYBasisV = [cursorPosition.elements[0], cursorPosition.elements[1]];
            } else {
                let axisTransform = Mat2.FromColumns(this.model.xUnit, this.model.yUnit);
                this.model.targetPoint = cursorPosition;
                this.model.translation = this.model.targetPoint;
            }
        }

    };

    onResize(renderWindow?: AGLRenderWindow): void {
        if(renderWindow && renderWindow.container !== undefined) {
            this.renderer.setSize(renderWindow.container.clientWidth, renderWindow.container.clientHeight);
            // this.camera.onCanvasResize(renderWindow.container.clientWidth, renderWindow.container.clientHeight);
            this.camera.onCanvasResize(500,500);
        }
    }


    dragEndCallback(event:AInteractionEvent, interaction?:ADragInteraction){
        // this.model.updateComponent();
        // this.model.signalComponentUpdate();
    };
}
