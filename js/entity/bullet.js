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
        if(entity instanceof Tank) {
            if(entity == this.attacker) return
            this.attacker.agent.reward += Config.REWARD_DAMAGE
            entity.damage(this.attack)
            this.clear()
        }
    }

    clear() {
        this.game.deleteBullet(this)
    }
}
