import {Vec2, V2, Precision, Random} from "../../anigraph";

export class Mat2 {
    /**
     * Like our Vector subclasses, we can basically think of our matrix class as a simple `number[]`
     * array bundled up with a bunch of useful functionality.
     * If you are thinking to yourself "that seems excessive"---it isn't.
     * Anyway, the only stored attribute we have is `elements`.
     */
    elements: number[];

    /**
     * For convenience, write getters and setters for individual entries of the matrix.
     * We will store our matrix in row major order. That means that our elements are stored
     * left to right, top to bottom. [m00, m01, m10, m11].
     */
    get m00(): number {
        return this.elements[0];
    }

    set m00(value) {
        this.elements[0] = value;
    }

    get m01(): number {
        return this.elements[1];
    }

    set m01(value) {
        this.elements[1] = value;
    }

    /** Write your code below
     * Write the remaining two getters and setters,
     * letting you access v.m10 and v.m11
     * as if they were regular stored properties
     */

    // TODO: m10 and m11 getters and setters

    /**
     * r0 should return the first row of the matrix as a Vec2
     */
    get r0(): Vec2 {
        return new Vec2(this.elements[0], this.elements[1]);
    }

    set r0(v: Vec2) {
        this.elements[0] = v.x;
        this.elements[1] = v.y;
    }

    /**
     * c0 should return the first column of the matrix as a Vec2
     */
    get c0(): Vec2 {
        return V2(this.elements[0], this.elements[2]);
        // the above line does the same as:
        // return new Vec2(this.elements[0], this.elements[2]);
    }

    set c0(v: Vec2) {
        this.elements[0] = v.x;
        this.elements[2] = v.y;
    }

    /** Write your code below
     * Write the remaining two getters and setters,
     * letting you access v.r1 and v.c1
     * as if they were regular stored properties.
     */


    //TODO: getters and setters for r1 and c1

    getElement(row: number, col: number): number {
        //Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * Now let's write a constructor. But first, a note on function overloading in TypeScript.
     *
     * Typescript is a bit odd in that you are allowed to overload the way functions are called,
     * but not how they are implemented. Why? Think of it as another kind of type checking. It can
     * tell you whether the arguments you provided are valid, but it's not going to change whatever
     * function you wrote to deal with those arguments. So you can tell TypeScript that different
     * sets of arguments are ok, but the actual function you write needs to be able to deal with
     * any of these "ok" arguments.
     *
     * Here we will write a constructor that can be called in three ways: with no arguments, with
     * an array of numbers as its only argument, or with four numbers as arguments. We will write
     * each of these declarations on consecutive lines, ordered from the least number of arguments
     * to the most. We'll top it off (or bottom it off?) with a constructor that takes a
     * "rest argument", which looks like `...args:Array<any>`. It's important that the last
     * signature be compatable with all the others, so `...args:Array<any>` basically says
     * "Yea sure, gimme some arbitrary arguments and I'll just sort it out."
     */

    public constructor();
    public constructor(elements: number[]);
    public constructor(m00: number, m01: number, m10: number, m11: number);
    public constructor(...args: Array<any>) {
        /**
         * Now we will check to see what arguments we actually got
         */
        if (args.length === 0) {
            /**
             * Case 1: `public constructor()`
             * If we got no arguments, let's set the matrix to the identity
             */
            this.elements = [1, 0, 0, 1];
        } else if (Array.isArray(args[0])) {
            /**
             * Case 2: ` public constructor(elements: [number, number, number, number])`
             * If the first argument is an array,
             * then we want to make our elements as a copy of that array.
             */

            // first we need to make sure that the array has 4 elements.
            if (args[0].length !== 4) {
                throw new Error(`elements array should contains 4 numbers`);
            }
            /**
             * we want to make a copy of that array instead of using it directly,
             * to prevent unexpected results because array is a reference type,
             * if you assignment the array parameter directly to this.elements,
             * any further modifications to that array will be reflected on
             * this.elements, which we don't want
             */

            // we can use `[...array]` spreader syntax to make a copy of an array.
            this.elements = [...args[0]];
        } else if (typeof args[0] === "number") {
            /**
             * Case 3 `public constructor(m00: number, m01: number, m10: number, m11: number)`
             * We first want to make sure our arguments have four numbers.
             * If not, we will throw error
             */
            if (args.length !== 4) {
                throw new Error(`invalid argument to Mat2: ${args}`);
            } else {
                /**
                 * If we got here, we must have called the constructor with four numbers.
                 * Let's set elements to a copy of those numbers.
                 * Recall that we can use `[...array]` spreader syntax to make a copy of an array.
                 */
                this.elements = [...args];
            }
        } else {
            /**
             * unrecognized case: should throw error
             */
            throw new Error(`invalid argument to Mat2: ${args}`);
        }
    }

    /**
     * Should construct and return a Mat2 based on the specified row vectors
     * @param r0
     * @param r1
     * @constructor
     */
    static FromRows(r0: Vec2, r1: Vec2): Mat2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * Should construct and return a Mat2 based on the specified column vectors
     * @param c0
     * @param c1
     * @constructor
     */
    static FromColumns(c0: Vec2, c1: Vec2): Mat2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * Awesome. Now that you have the basics of function overloading, let's use a more specialized
     * version to define the `times(...)` function. This is our multiplication operator. And, since
     * we can multiply a 2x2 matrix by another matrix, vector, or scalar, we will want to use this
     * function on any of these types as well.
     *
     * We are going to give you this function, but make sure you understand it!
     * You will have to implement the two protected functions that are used inside of our
     * implementation, `_timesMatrix` and `_timesVector`, yourself.
     *
     * Note that the return type is different here depending on what our arguments are!
     */

    /**
     * This version of the constructor multiplies by a constant
     * @param other
     */
    times(other: number): Mat2;
    /**
     *  This version of the constructor multiplies by a Vec2
     * @param other
     */
    times(other: Vec2): Vec2;
    /**
     * This version of the constructor multiplies by another Mat2
     * @param other
     */
    times(other: Mat2): Mat2;
    /**
     * This is the generic verions, which is actually implemented.
     * @param other
     * @returns {Mat2 | Vec2}
     */
    times(other: number | Vec2 | Mat2): Vec2 | Mat2 {
        if (typeof other === "number") {
            const m = new Mat2();
            for (let i = 0; i < m.elements.length; i++) {
                m.elements[i] = this.elements[i] * other;
            }
            return m;
        } else if (other instanceof Vec2) {
            return this._timesVector(other);
        } else if (other instanceof Mat2) {
            return this._timesMatrix(other);
        }
        throw new Error(
            `Tried to do Mat2.times(other) with other type ${typeof other}`
        );
    }

    /**
     * _timesMatrix should take another Mat2 as an argument, and return the current
     * matrix right-multiplied with the argument matrix as a new matrix.
     */
    protected _timesMatrix(rhs: Mat2): Mat2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * _timesVector should take `v:Vec2` and return the vector that you get from left-multiplying
     * by the current matrix.
     */
    protected _timesVector(v: Vec2): Vec2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * `plus` should take the place of the `+` operator. That means it should return a new Mat2
     * with entries that are equal to the sum of the current matrix's entries and the corresponding
     * entries of the argument matrix.
     */
    plus(other: Mat2): Mat2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * `minus` should take the place of the `-` operator. That means it should return a new Mat2
     * with entries that are equal to the current matrix's entries minus the corresponding entries
     * of the argument matrix.
     */
    minus(other: Mat2): Mat2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * determinant should calculate and return the determinant of the matrix
     */
    determinant(): number {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * getInverse should return a new matrix that is the inverse of the current matrix.
     * OR, if the current matrix is rank deficient (non-invertible) then it should return null.
     * The matrix is invertible when the determinant is non-zero (above epsilon in absolute value).
     * This check has already been written for you.
     * Complete the part of the code that runs when the determinant is non-zero.
     */
    getInverse(): Mat2 | null {
        let det = this.determinant();
        if (Precision.isTiny(det)) {
            return null;
        } else {
            //TODO: Replace the line below with your code!
            throw new Error("Not Implemented");
        }
    }


    /**
     * Return a matrix that will
     * scale both x and y value of all vectors on the plane by @param `scale`
     * @param scale : number;
     * @returns Mat2
     */
    static Scale(scale: number): Mat2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * Return a matrix that will
     * rotate all vectors on the plane by @param `radians`
     * @notice it will rotate counter-clock-wise
     * @param radians : number;
     * @returns Mat2
     */
    static Rotation(radians: number): Mat2 {
        //TODO: Replace the line below with your code!
        throw new Error("Not Implemented");
    }

    /**
     * Freebies below... y'welcome.
     */

    /**
     * This is how you load the identity...
     */
    loadIdentity(): void {
        this.elements = [1, 0, 0, 1];
    }

    /**
     * And this is how you make a copy of a matrix. It's written so that it will continue to work
     * even if you subclass Mat2. Don't worry about the syntax for now.
     */
    clone(): Mat2 {
        return new Mat2(this.elements);
    }

    /**
     * Return true if this.elements are within precision equal to other.elements
     * @param other
     */
    isEqualTo(other: Mat2, tolerance?: number): boolean {
        let epsilon: number =
            tolerance === undefined ? Precision.epsilon : tolerance;
        let n: number = this.elements.length;
        while (n--) {
            if (Math.abs(this.elements[n] - other.elements[n]) > epsilon) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns a matrix with random floats for each element
     *
     * @returns a matrix with random elements
     */
    static Random(): Mat2 {
        return new Mat2(Random.floatArray(4));
    }

    /**
     * Creates a diagonal matrix with diagonal entries d0 and d1
     * @param d0
     * @param d1
     * @returns {Mat2}
     * @constructor
     */
    static Diag(d0: number, d1: number): Mat2 {
        return new Mat2(d0, 0, 0, d1);
    }

}
