import {BoundingBox3D} from "./BoundingBox3D";

export interface HasBounds {
    // getBounds2D(cameraMatrix?:Mat4):BoundingBox2D;
    // getBounds3D():BoundingBox3D;
    uid: string;
    getBounds(): BoundingBox3D;
}
