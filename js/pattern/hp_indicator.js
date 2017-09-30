"use strict"

class HpIndicator extends Pattern {
    constructor(parent, offset = Vector.new(0, 0), anchor = parent) {
        super(parent, offset)

        this.mode = 'rect'
        this.size.set(Config.TANK_WIDTH, Config.HP_HEIGHT)
        this.style = Array(Config.HP_HEIGHT).fill(Array(Config.TANK_WIDTH).fill(1))
        this.color = Config.HP_COLOR
        this.color_remain = Config.HP_COLOR_REMAIN
    }

    _drawPattern() {
        super._drawPattern()

        let sizeX = Math.round(Config.TANK_WIDTH * this.parent.hp / Config.TANK_HP)
        this.style = Array(Config.HP_HEIGHT).fill(this.style[0].fill(0, sizeX, Config.TANK_WIDTH))
        this.game.drawRect(this.position, this.color, this.size, Entity.UP)
        this.game.drawRect(this.position, this.color_remain, this.size, Entity.UP, this.style)
    }
}
