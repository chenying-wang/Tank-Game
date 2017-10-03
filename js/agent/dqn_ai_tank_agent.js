"use strict"

class DqnAiTankAgent extends AiTankAgent {
    constructor() {
        super()

        this.greedy = 0.01
        this.learningRate = 0.1
        this.dicountFactor = 0.9
    }

    _initValueFunction() {
        
    }

    action() {
        const dx = this.status[Config.STATUS_DISTANCE_X]
        const dy = this.status[Config.STATUS_DISTANCE_Y]
        this.move(Vector.new(dx, dy).angle())
        this.fire()
    }
}
