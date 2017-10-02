"use strict"

class CooldownIndicator extends Pattern {
    constructor(parent, offset = Vector.new(0, 0), anchor = parent) {
        super(parent, offset, anchor)

        this.mode = 'tree'

        this.ring = Arc.new(this)
        this.ring.radius = 8
        this.ring.color = Config.CD_COLOR

        this.font = Font.new(this)
        this.font.color = Config.CD_COLOR

        this.patterns.push(this.ring)
        this.patterns.push(this.font)
    }

    _drawPattern() {
        super._drawPattern()

        this.ring.angle = 360 - (this.parent.cd / Config.TANK_COOLDOWN) * 360
        this.font.text = Math.round(100 * (1 - this.parent.cd / Config.TANK_COOLDOWN)) + '%'
    }
}
