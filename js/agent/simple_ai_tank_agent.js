"use strict"

class SimpleAiTankAgent extends AiTankAgent {
    constructor() {
        super()
    }
    
    loop() {
        this._updateStatus()
        this._action()
    }

    _action() {
        const dx = this.status[Config.STATUS_DISTANCE_X]
        const dy = this.status[Config.STATUS_DISTANCE_Y]
        this.move(Vector.new(dx, dy).angle())
        this.fire()
    }
}
