"use strict"

class TankAgent {
    constructor() {
        this.status = []
        this.reward = 0
    }

    static new(...args) {
        return new this(...args)
    }

    move(angle) {
        this.tank.speed.setAngle(angle)
    }

    fire() {
        this.tank._fire()
    }
}
