"use strict"

class Arc extends Pattern {
    constructor(parent) {
        super(parent)

        this.radius = 1
        this.start = 0
        this.angle = 360
    }

    _drawPattern() {
        this.game.drawArc(this.position, this.color, this.radius, this.start, this.angle)
    }
}
