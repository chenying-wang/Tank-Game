"use strict"

class BulletPattern extends Pattern {
    constructor(parent) {
        super(parent)

        this.mode = 'rect'
        this.size.set(Config.BULLET_WIDTH, Config.BULLET_HEIGHT)
        this.color = Config.BULLET_COLOR
    }

    _drawPattern() {
        super._drawPattern()

        this.game.drawRect(this.position, this.color, this.size, this.parent.speed.angle())
    }
}
