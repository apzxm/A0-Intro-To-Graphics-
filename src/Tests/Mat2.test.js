import { V2, Vec2 } from "../anigraph";
import { Mat2 } from "../A0"
import {
  ArrayEqualTo,
  ArrayCloseTo,
  MatrixEqual,
  VecEqual,
  VertexArray2DCircToBeCloseTo,
  VertexArray2DToBeCloseTo,
  degsToRads,
} from "./helpers/TestHelpers";
expect.extend(ArrayEqualTo);
expect.extend(ArrayCloseTo);
expect.extend(VertexArray2DToBeCloseTo);
expect.extend(MatrixEqual);
expect.extend(VecEqual);
expect.extend(VertexArray2DCircToBeCloseTo);

describe("Mat2 Constructor Tests", () => {
  test("Test constructor with no argument", () => {
    let m = new Mat2();
    expect(m.elements).ArrayEqualTo([1, 0, 0, 1]);
  });

  test("Test constructor with four separate arguments", () => {
    let m = new Mat2(1, 2, 3, 4);
    expect(m.elements).ArrayEqualTo([1, 2, 3, 4]);
  });

  test("Test constructor with array argument", () => {
    let m = new Mat2([5, 6, 7, 8]);
    expect(m.elements).ArrayEqualTo([5, 6, 7, 8]);
  });
});

describe("Mat2 element accessor tests", () => {
  test("m10", () => {
    let m = new Mat2(5, 9, 6, 4);
    expect(m.m10).toEqual(6);
  });

  test("m11", () => {
    let m = new Mat2(5, 9, 6, 4);
    expect(m.m11).toEqual(4);
  });

  test("r1", () => {
    let m = new Mat2(5, 9, 6, 4);
    expect(m.r1).VecEqual(V2(6, 4));
  });

  test("c1", () => {
    let m = new Mat2(5, 9, 6, 4);
    expect(m.c1).VecEqual(V2(9, 4));
  });

  test("getElement(0,0)", () => {
    let m = new Mat2(1, 2, 3, 4);
    expect(m.getElement(0, 0)).ArrayEqualTo(1);
  });

  test("getElement(1,0)", () => {
    let m = new Mat2(1, 2, 3, 4);
    expect(m.getElement(1, 0)).ArrayEqualTo(3);
  });
});

function MatVecTest(leftMatrix, rightVector, Mv_result) {
  expect(leftMatrix.times(rightVector).elements).ArrayEqualTo(
    Mv_result.elements
  );
}

describe("Matrix Vector Multiplication", () => {
  test("m.times(v) zero vector", () => {
    MatVecTest(new Mat2(1, 0, 0, 1), V2(0, 0), V2(0, 0));
  });
  test("m.times(v) identity matrix times positive", () => {
    MatVecTest(new Mat2(1, 0, 0, 1), V2(1, 2), V2(1, 2));
  });

  test("m.times(v) identity matrix times negative", () => {
    MatVecTest(new Mat2(1, 0, 0, 1), V2(-1, -2), V2(-1, -2));
  });

  test("m.times(v) matrix a)", () => {
    MatVecTest(new Mat2(1, 2, 3, 4), V2(5, 6), V2(17, 39));
  });

  test("m.times(v) matrix b)", () => {
    MatVecTest(new Mat2(-1, -2, -3, -4), V2(5, 6), V2(-17, -39));
  });

  test("m.times(v) matrix a) 2", () => {
    MatVecTest(new Mat2(0.25, 0.4, 0.75, 0.6), V2(16, 25), V2(14, 27));
  });
});

describe("Mat2 Multiplication", () => {
  test("m.times(m) identity", () => {
    let m = new Mat2(1, 0, 0, 1);
    let m2 = new Mat2(1, 3, 5, 9);
    expect(m.times(m2).elements).ArrayEqualTo([1, 3, 5, 9]);
  });

  test("m.times(m) diagonal 2*11", () => {
    let m = new Mat2(2, 0, 0, 2);
    let m2 = new Mat2(11, 0, 0, 11);
    expect(m.times(m2).elements).ArrayEqualTo([22, 0, 0, 22]);
  });

  test("m.times(m) diagonal frac 20*1/4", () => {
    let m = new Mat2(20, 0, 0, 20);
    let m2 = new Mat2(0.25, 0, 0, 0.25);
    expect(m.times(m2).elements).ArrayEqualTo([5, 0, 0, 5]);
  });

  test("m.times(m) additional a)", () => {
    let m = new Mat2(1, 2, 3, 4);
    let m2 = new Mat2(5, 6, 7, 8);
    expect(m.times(m2).elements).ArrayEqualTo([19, 22, 43, 50]);
  });

  test("m.times(m) additional b)", () => {
    let m = new Mat2(0.5, 0.25, 1.5, 2.75);
    let m2 = new Mat2(4, 8, 12, 16);
    expect(m.times(m2).elements).ArrayEqualTo([5, 8, 39, 56]);
  });
  test("m.times(m) additional c)", () => {
    let m = new Mat2(-2, 5, -3.5, 1);
    let m2 = new Mat2(8, 40, 32, 24);
    expect(m.times(m2).elements).ArrayEqualTo([144, 40, 4, -116]);
  });
});

describe("Matrix Determinant", () => {
  test("Identity:", () => {
    let m = new Mat2();
    expect(m.determinant()).toEqual(1);
  });

  test("Diagonal:", () => {
    let m = new Mat2(5, 0, 0, 5);
    expect(m.determinant()).toEqual(25);
  });

  test("Null:", () => {
    let m = new Mat2(1, 1, 1, 1);
    expect(m.determinant()).toEqual(0);
  });

  test("1234", () => {
    let m = new Mat2(1, 2, 3, 4);
    expect(m.determinant()).toEqual(-2);
  });

  test("Random1", () => {
    let m = new Mat2(11.2, 12.7, 30.4, 72.7);
    expect(m.determinant()).toBeCloseTo(428.16);
  });
});

function RandomInverseTest() {
  let tries = 0;
  let skip = false;
  while (!skip) {
    let m = Mat2.Random();
    let det = m.determinant();
    if (det > 0.2 || tries > 100) {
      expect(m.times(m.getInverse()).elements).ArrayCloseTo([1, 0, 0, 1]);
      skip = true;
    }
    tries++;
  }
  // console.log(`tries was ${tries}`)
  if (tries > 90) {
    console.warn("Statistically unlikely number of tries...");
  }
}

describe("Matrix Inverse", () => {
  test("Identity:", () => {
    let m = new Mat2();
    expect(m.getInverse()).MatrixEqual(new Mat2(1, 0, 0, 1));
  });

  for (let i = 0; i < 10; i++) {
    test(`Random ${i}`, () => {
      RandomInverseTest();
    });
  }
});

describe("Scale Matrix", () => {
  test("Scale by 3", () => {
    let v = new Vec2(2, 3);
    let s = Mat2.Scale(3);
    expect(s.times(v)).VecEqual(new Vec2(6, 9));
  });
  test("Scale by -2", () => {
    let v = new Vec2(2, 3);
    let s = Mat2.Scale(-2);
    expect(s.times(v)).VecEqual(new Vec2(-4, -6));
  });

  test("Scale by 0", () => {
    let v = new Vec2(2, 3);
    let s = Mat2.Scale(0);
    expect(s.times(v)).VecEqual(new Vec2(0, 0));
  });
});

describe("Rotate Matrix", () => {
  test("Rotate by 90deg", () => {
    let v = new Vec2(2, 3);
    let r = Mat2.Rotation(degsToRads(90));
    expect(r.times(v)).VecEqual(new Vec2(-3, 2));
  });

  test("Rotate by -90deg", () => {
    let v = new Vec2(2, 3);
    let r = Mat2.Rotation(degsToRads(-90));
    expect(r.times(v)).VecEqual(new Vec2(3, -2));
  });

  test("Rotate by 180deg", () => {
    let v = new Vec2(2, 3);
    let r = Mat2.Rotation(degsToRads(180));
    expect(r.times(v)).VecEqual(new Vec2(-2, -3));
  });

  test("Rotate by -180deg", () => {
    let v = new Vec2(2, 3);
    let r = Mat2.Rotation(degsToRads(-180));
    expect(r.times(v)).VecEqual(new Vec2(-2, -3));
  });

  test("Rotate by 45 deg", () => {
    let v = new Vec2(1, 1);
    let r = Mat2.Rotation(degsToRads(45));
    expect(r.times(v)).VecEqual(new Vec2(0, Math.sqrt(2)));
  });

  test("Rotate by 30 deg", () => {
    let v = new Vec2(3, 4);
    let r = Mat2.Rotation(degsToRads(30));
    expect(r.times(v).elements).ArrayCloseTo([0.598076211353, 4.96410161514]);
  });
  test("Rotate by 12 deg", () => {
    let v = new Vec2(3, 4);
    let r = Mat2.Rotation(degsToRads(12));
    expect(r.times(v).elements).ArrayCloseTo([2.10279603893, 4.53632547539]);
  });
  test("Rotate by -96 deg", () => {
    let v = new Vec2(3, 4);
    let r = Mat2.Rotation(degsToRads(-96));
    expect(r.times(v).elements).ArrayCloseTo([3.66450219167, -3.40167953918]);
  });
});
