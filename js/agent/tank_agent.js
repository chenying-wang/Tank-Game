"use strict"

class TankAgent {
    constructor() {
        this.die = false
        this.reward = 0
    }

    init() {
        this.reward = 0
    }

    static new(...args) {
        return new this(...args)
    }

    loop() {
        if(this.die) return
        this.fire()
    }

    move(angle) {
        this.tank.speed.setAngle(angle)
    }

    fire() {
        this.tank.fire()
    }
}
