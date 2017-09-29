"use strict"

class CooldownIndicator extends Pattern {
    constructor(parent) {
        super(parent)

        this.mode = 'tree'
        this.position = Vector.new(16, 16)

        this.ring = Arc.new(this)
        this.ring.radius = 8
        this.ring.color = Config.CD_COLOR

        this.font = Font.new(this)

        this.patterns.push(this.ring)
        this.patterns.push(this.font)
    }

    _drawPattern() {
        this.ring.angle = 360 - (this.parent.cd / Config.TANK_COOLDOWN) * 360
        this.font.text = Math.round(100 * (1 - this.parent.cd / Config.TANK_COOLDOWN)) + '%'
    }
}
