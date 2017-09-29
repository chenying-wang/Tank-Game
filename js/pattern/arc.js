"use strict"

class Arc extends Pattern {
    constructor(parent, offset = Vector.new(0, 0), anchor = parent) {
        super(parent, offset, anchor)

        this.radius = 1
        this.start = 0
        this.angle = 360
    }

    _drawPattern() {
        super._drawPattern()

        this.game.drawArc(this.position, this.color, this.radius, this.start, this.angle)
    }
}
