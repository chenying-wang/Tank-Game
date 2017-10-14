"use strict"

class Entity {
    constructor(tankGame, position, id = null) {
        this.game = tankGame
        this.position = position
        this.id = id

        this.patterns = []
        this.size = Vector.new(1, 1)
        this.speed = Vector.new()
    }

    static new(...args) {
        return new this(...args)
    }

    move() {
        this.position.addEqual(this.speed)
    }

    draw() {
        for (let pattern of this.patterns) {
            pattern.draw()
        }
    }

    collide(entity) {
        let aAngleRad = this.speed.angle() / 180 * Math.PI
        let aCollideSize = this.size.dot(
            Math.abs(Math.cos(aAngleRad)), Math.abs(Math.sin(aAngleRad)),
            Math.abs(Math.sin(aAngleRad)), Math.abs(Math.cos(aAngleRad))
        )
        let amin = this.position.minus(aCollideSize.multiply(0.5))
        let amax = amin.add(aCollideSize)

        let bAngleRad = entity.speed.angle() / 180 * Math.PI
        let bCollideSize = entity.size.dot(
            Math.abs(Math.cos(bAngleRad)), Math.abs(Math.sin(bAngleRad)),
            Math.abs(Math.sin(bAngleRad)), Math.abs(Math.cos(bAngleRad))
        )
        let bmin = entity.position.minus(bCollideSize.multiply(0.5))
        let bmax = bmin.add(bCollideSize)

        if (Config.DEBUG_COLLIDE === true) {
            this.game.drawRect(this.position, 'rgba(0, 0, 255, 10)', aCollideSize)
            entity.game.drawRect(entity.position, 'rgba(0, 0, 255, 10)', bCollideSize)
            entity.game.drawRect(entity.position, 'rgba(0, 255, 0, 10)')
        }

        this.collideSize = aCollideSize
        entity.collideSize = bCollideSize
        if (bmax.x < amin.x || bmin.x > amax.x || bmax.y < amin.y || bmin.y > amax.y) {
            return false
        }

        this.collideCallback(entity)
        return true
    }
}

Entity.UP = 0
Entity.RIGHT = 90
Entity.DOWN = 180
Entity.LEFT = 270
