import { VertexArray } from "./VertexArray";
import {V2, Vec2, Vec3, Vec4} from "../linalg";
import { BoundingBox3D } from "./BoundingBox3D";
import { Color } from "../Color";
import {
  VertexAttributeArray,
  VertexAttributeColor3DArray,
  VertexAttributeColorArray,
  VertexPositionArray2DH,
} from "./VertexAttributeArray";
import {VertexIndexArray} from "./VertexIndexArray";

export class VertexArray2D extends VertexArray<Vec2> {
  public attributes: { [name: string]: VertexAttributeArray<any> } = {};

  /** Get set position */
  set position(value: VertexPositionArray2DH) {
    this.attributes["position"] = value;
  }
  get position(): VertexPositionArray2DH {
    return this.attributes["position"] as VertexPositionArray2DH;
  }

  getBounds() {
    let b = new BoundingBox3D();
    b.boundVertexPositionArrray(this.position);
    return b;
  }

  get length() {
    return this.position.elements.length / 3;
  }

  getPoint2DAt(i: number) {
    return this.position.getPoint2DAt(i);
  }

  FillColor(color:Color){
    for (let v = 0; v < this.length; v++) {
      this.color.setAt(v, color);
    }
    return this;
  }

  RandomizeColor(){
    for (let v = 0; v < this.length; v++) {
      this.color.setAt(v, Color.Random());
    }
    return this;
  }


  static CircleVArray(size: number, nverts: number = 16) {
    let verts = new VertexArray2D();
    for (let v = 0; v < nverts; v++) {
      let phase = (v * (2 * Math.PI)) / nverts;
      verts.addVertex(V2(Math.cos(phase) * size, Math.sin(phase) * size));
    }
    return verts;
  }

  static BoundingBoxVerts(minxy: Vec2, maxxy: Vec2) {
    let va = new VertexArray2D();
    va.addVertex(minxy);
    va.addVertex(V2(maxxy.x, minxy.y));
    va.addVertex(maxxy);
    va.addVertex(V2(minxy.x, maxxy.y));
    return va;
  }

  static Anchor(
    outerRadius: number = 25,
    innerRadius: number = 10,
    location?: Vec2
  ) {
    let verts = [
      new Vec2(innerRadius, innerRadius),
      new Vec2(0, outerRadius),
      new Vec2(-innerRadius, innerRadius),
      new Vec2(-outerRadius, 0),
      new Vec2(-innerRadius, -innerRadius),
      new Vec2(0, -outerRadius),
      new Vec2(innerRadius, -innerRadius),
      new Vec2(outerRadius, 0),
    ];
    if (location) {
      verts = verts.map((v) => {
        return v.plus(location);
      });
    }
    return VertexArray2D.FromLists(verts);
  }

  /**
   * Positions have to be given with homogeneous coordinates!
   * @param positions
   * @param colors
   */
  constructor(homogeneous_positions?: number[], colors?: number[]) {
    super();
    if (homogeneous_positions !== undefined) {
      this.position = new VertexPositionArray2DH(homogeneous_positions);
    } else {
      this.position = new VertexPositionArray2DH();
    }
    if(colors !== undefined){
      this.initColorAttribute();
      this.color.setElements(colors);
    }
  }

  initColorAttribute(){
    this.color = new VertexAttributeColorArray();
  }
  initColor3DAttribute(){
    this.color = new VertexAttributeColor3DArray();
  }
  initIndices(vertsPerElement:number=2){
    this.indices = new VertexIndexArray(vertsPerElement);
  }

  addVertex(v: Vec2 | Vec3, color?: Color | Vec3 | Vec4) {
    this.position.push(v);
    if (color) {
      this.color?.push(color);
    }
  }

  addVertices(positions: Vec2[] | Vec3[], colors?: Color|Color[] | Vec3[] | Vec4[]) {
    this.position.pushArray(positions);
    if (colors) {
      if(colors instanceof Color){
        this.color?.pushArray(new Array(positions.length).fill(colors));
      }else {
        this.color?.pushArray(colors);
      }
    }
  }

  addVertexToFront(v: Vec2 | Vec3, color?: Color | Vec3 | Vec4){
    this.position.unshift(v);
    if (color) {
      this.color?.unshift(color);
    }
  }

  addVerticesToFront(positions: Vec2[] | Vec3[], colors?: Color[] | Vec3[] | Vec4[]) {
    this.position.unshiftArray(positions);
    if (colors) {
      this.color?.unshiftArray(colors)
    }
  }


  toString() {
    let rstring = `new VertexArray2D([\n`;
    for (let e = 0; e < this.position.elements.length - 1; e++) {
      rstring = rstring + `${this.position.elements[e]},`;
    }
    rstring =
      rstring +
      `${this.position.elements[this.position.elements.length - 1]}])`;
    return rstring;
  }

  static FromLists(positions:Vec2[], colors?:Color[]){
    let v = new VertexArray2D();
    if(colors===undefined) {
      v.addVertices(positions);
    }else{
      v.initColorAttribute()
      v.addVertices(positions, colors);
    }
    return v;
  }

  get _averagePosition() {
    let average = new Vec3(0, 0, 0);
    for (let v = 0; v < this.length; v++) {
      average.addVector(this.position.getAt(v));
    }
    return average.Point2D;
  }


}
