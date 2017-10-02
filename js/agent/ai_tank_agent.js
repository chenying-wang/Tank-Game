"use strict"

class AITankAgent extends TankAgent {
    constructor() {
        super()

        this.learningRate = 0.1
        this.dicountFactor = 0.1
    }

    action() {
        const dx = this.status[Config.STATUS_DISTANCE_X]
        const dy = this.status[Config.STATUS_DISTANCE_Y]
        this.move(Vector.new(dx, dy).angle())
        this.fire()
    }
}
