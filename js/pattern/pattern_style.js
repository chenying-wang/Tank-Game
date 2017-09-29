"use strict"

// TEST
class PatternStyle {
    constructor(pattern) {
        this.patten = pattern
    }

    static new(...args) {
        return new this(...args)
    }
}
// TEST
