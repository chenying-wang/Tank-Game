class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static new(...args) {
        return new this(...args)
    }
}
