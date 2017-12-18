"use strict"

class SimpleAiTankAgent extends AiTankAgent {
    constructor() {
        super()
    }
    
    loop() {
        if(this.die) return
        this._updateStatus()
        this._action()
    }

    _action() {
        const dx = this.status[this.STATUS_DISTANCE_X] * Config.GRID_X
        const dy = this.status[this.STATUS_DISTANCE_Y] * Config.GRID_Y
        if(Math.random() < 0.5) {
            if(dx > 0) this.move(90)
            else this.move(270)
        } else {
            if(dy > 0) this.move(0)
            else this.move(180)
        }
        this.fire()
    }
}
