"use strict"

class Pattern {
    constructor(parent) {
        this.parent = parent
        this.game = parent.game

        this.mode = 'none'
        this.position = parent.position
        this.size = Vector.new(1, 1)
        this.patterns = []
    }

    static new(...args) {
        return new this(...args)
    }

    draw() {
        this._drawPattern()
        if(this.mode == 'none') return
        if(this.mode == 'tree') {
            for (let pattern of this.patterns) {
                pattern._drawPattern()
            }
        }
    }
}
