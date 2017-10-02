"use strict"

class Font extends Pattern {
    constructor(parent, offset = Vector.new(0, 0), anchor = parent) {
        super(parent, offset, anchor)

        this.text = ''
        this.color = Config.PATTERN_COLOR
    }

    _drawPattern() {
        super._drawPattern()

        this.game.drawFont(this.position, this.text, '11px sans-serif', this.color)
    }
}
