"use strict"

class TankAgent {
    constructor(tank) {
        this.tank = tank
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
