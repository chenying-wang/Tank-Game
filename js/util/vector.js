"use strict"

class Vector {
    constructor(arg1 = 0, arg2 = 0) {
        if (arg1 instanceof Vector) {
            this.x = arg1.x
            this.y = arg1.y
        } else {
            this.x = arg1
            this.y = arg2
        }
    }

    static new(...args) {
        return new this(...args)
    }

    set(arg1 = 0, arg2 = 0) {
        if (arg1 instanceof Vector) {
            this.x = arg1.x
            this.y = arg1.y
        } else {
            this.x = arg1
            this.y = arg2
        }
        return this
    }

    setLengthAngle(length, angle) {
        let angleRad = angle * Math.PI / 180
        this.x = length * Math.sin(angleRad)
        this.y = length * Math.cos(angleRad)
        return this.round()
    }

    setLength(length) {
        this.setLengthAngle(length, this.angle())
        return this.round()
    }

    setAngle(angle) {
        this.setLengthAngle(this.length(), angle)
        return this.round()
    }

    add(vector) {
        return Vector.new(this).addEqual(vector)
    }

    minus(vector) {
        return Vector.new(this).minusEqual(vector)
    }

    multiply(factor) {
        return Vector.new(this).multiplyEqual(factor)
    }

    addEqual(vector) {
        this.x += vector.x
        this.y += vector.y
        return this
    }

    minusEqual(vector) {
        this.x -= vector.x
        this.y -= vector.y
        return this
    }

    multiplyEqual(factor) {
        this.x *= factor
        this.y *= factor
        return this.round()
    }

    round() {
        this.x = Math.round(this.x * 1000) / 1000
        this.y = Math.round(this.y * 1000) / 1000
        return this
    }

    length(vector) {
        let v = this
        if(vector instanceof Vector) v = vector.minus(v)
        let l = v.x ** 2 + v.y ** 2
        l = Math.sqrt(l)
        return l
    }

    angle(vector) {
        let v = this
        if(vector instanceof Vector) v = vector.minus(v)
        let a = Math.atan2(v.x, v.y) * 180 / Math.PI
        a = (a + 360) % 360
        return a
    }

    unit() {
        return Vector.new(this).multiply(1 / this.length())
    }

    dot(a11, a12, a21, a22) {
        let result = Vector.new()
        result.x = Math.round(a11 * this.x + a12 * this.y)
        result.y = Math.round(a21 * this.x + a22 * this.y)
        return result.round()
    }
}
