"use strict"

class Bullet extends Entity {
    constructor(tankGame, position) {
        super(tankGame, position)

        this.patterns.push(BulletPattern.new(this))

        this.size.set(Config.BULLET_WIDTH, Config.BULLET_HEIGHT)
        this.attack = Config.BULLET_ATTACK
    }

    move() {
        super.move()
    }

    collideCallback(entity) {
        entity.damage(this.attack)
        this.clear()
    }

    clear() {
        this.game.deleteBullet(this)
    }
}
