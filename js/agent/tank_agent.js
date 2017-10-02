"use strict"

class TankAgent {
    constructor(tank) {
        this.tank = tank
        tank.agent = this
        this.game = this.tank.game

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

    updateStatus() {
        const nearestTank = this.findNearestTank()
        this.status[Config.STATUS_DISTANCE_X] =
             Math.round(nearestTank.position.minus(this.tank.position).x)
        this.status[Config.STATUS_DISTANCE_Y] =
            Math.round(nearestTank.position.minus(this.tank.position).y)
        this.status[Config.STATUS_SPEED_ANGLE] = Math.round(nearestTank.speed.angle())
    }

    findNearestTank() {
        const position = this.tank.position
        let nearestTank = this.tank
        let minDistance = Vector.new(Config.GRID_X, Config.GRID_Y)
        for(let tank of this.game.tanks) {
            if(tank == this.tank) continue
             if(position.length(tank.position) < minDistance.length()) {
                 minDistance = tank.position.minus(this.tank.position)
                 nearestTank = tank
             }
        }
        return nearestTank
    }
}
