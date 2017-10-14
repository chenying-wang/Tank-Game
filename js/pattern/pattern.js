"use strict"

class Pattern {
    constructor(parent, offset = Vector.new(0, 0), anchor = parent) {
        this.parent = parent
        this.offset = offset
        this.anchor = anchor || this.parent
        this.game = parent.game

        this.mode = 'none'
        this.position = this.anchor.position.add(this.offset)
        this.size = Vector.new(1, 1)
        this.color = Config.PATTERN_COLOR
        this.patterns = []
    }

    static new(...args) {
        return new this(...args)
    }

    draw() {
        if(this.mode === 'none') return
        this._drawPattern()
        if(this.mode === 'tree') {
            for (let pattern of this.patterns) {
                pattern._drawPattern()
            }
        }
    }

    _drawPattern() {
        this.position = this.anchor.position.add(this.offset)
    }
}
