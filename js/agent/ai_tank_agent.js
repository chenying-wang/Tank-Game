"use strict"

class AiTankAgent extends TankAgent {
    constructor() {
        super()

        this.STATUS_NUMBERS = 6
        this.STATUS_X = 0
        this.STATUS_Y = 1
        this.STATUS_DISTANCE_X = 2
        this.STATUS_DISTANCE_Y = 3
        this.STATUS_SPEED_ANGLE = 4
        this.STATUS_COOLDOWN = 5

        this.ACTION_NUMBERS = 4
        this.DIFF_ANGLE = 360 / this.ACTION_NUMBERS

        this.status = []
    }

    init() {
        super.init()

        this._updateStatus()
    }

    _updateStatus() {
        this.status[this.STATUS_X] = this.tank.position.x / Config.GRID_X
        this.status[this.STATUS_Y] = this.tank.position.y / Config.GRID_Y
        const nearestTank = this._findNearestTank()
        this.status[this.STATUS_DISTANCE_X] =
            Math.round(nearestTank.position.minus(this.tank.position).x) / Config.GRID_X
        this.status[this.STATUS_DISTANCE_Y] =
            Math.round(nearestTank.position.minus(this.tank.position).y) / Config.GRID_Y
        this.status[this.STATUS_SPEED_ANGLE] = (Math.round(nearestTank.speed.angle()) - 180 ) / 180
        this.status[this.STATUS_COOLDOWN] = this.tank.cd / Config.TANK_COOLDOWN
    }

    _findNearestTank() {
        const position = this.tank.position
        let nearestTank = this.tank
        let minDistance = Vector.new(Config.GRID_X, Config.GRID_Y)
        for (let tank of this.game.tanks) {
            if (tank === this.tank) continue
            if (position.length(tank.position) < minDistance.length()) {
                minDistance = tank.position.minus(this.tank.position)
                nearestTank = tank
            }
        }
        return nearestTank
    }
}
