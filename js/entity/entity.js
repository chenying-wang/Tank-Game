class Entity {
    constructor(tankGame, position) {
        this.game = tankGame
        this.position = position
        this.size = Vector.new(1, 1)
        this.speed = Vector.new()
        this.color = Config.ENTITY_COLOR
    }

    static new(...args) {
        return new this(...args)
    }

    move() {
        this.position.addEqual(this.speed)
    }

    draw() {
        this.game.draw(this.position, this.color, this.size, this.speed.angle())
    }

    collide(entity) {
        //B.max(x) < A.min(x) || B.min(x) > A.max(x) || B.max(y) < A.min(y) || B.min(y) > A.max(y)

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

        this.game.draw(this.position, 'rgba(0, 0, 255, 10)', aCollideSize)
        entity.game.draw(entity.position, 'rgba(0, 0, 255, 10)', bCollideSize)
        entity.game.draw(entity.position, 'rgba(0, 255, 0, 10)')

        if(bmax.x < amin.x || bmin.x > amax.x || bmax.y < amin.y || bmin.y > amax.y) {
            return false
        }
        this.game.deleteTank(entity)
        this.game.deleteBullet(this)
        return true
    }
}

Entity.UP = 0
Entity.RIGHT = 90
Entity.DOWN = 180
Entity.LEFT = 270
