"use strict"

class Tank extends Entity {
    constructor(tankGame, position, id = null) {
        super(tankGame, position)

        this.id = id
        this.patterns.push(TankPattern.new(this))
        if(this.id == 'player') {
            this.patterns.push(CooldownIndicator.new(this, Vector.new(16, 16), this.game.origin))
        }
        this.patterns.push(HpIndicator.new(this, Vector.new(0, Math.floor(Config.TANK_HEIGHT / 1.5))))

        this.size.set(Config.TANK_WIDTH, Config.TANK_HEIGHT)
        this.speed.set(0, Config.TANK_SPEED)
        this.hp = Config.TANK_HP
        this.cd = 0
    }

    cooldown() {
        if(this.cd <= 0) return
        this.cd -= 1
    }

    _fire() {
        if(this.cd > 0) return
        this.cd = Config.TANK_COOLDOWN

        let bulletPosition = Vector.new(
            this.position.x,
            this.position.y
        )
        const offset = Vector.new(this.speed).
            setLength((this.size.y + Config.BULLET_HEIGHT + 1) / 2)
        bulletPosition.addEqual(offset)

        let bullet = Bullet.new(this.game, bulletPosition)
        bullet.speed = Vector.new(this.speed).setLength(Config.BULLET_SPEED)
        this.game.bullets.push(bullet)
    }

    damage(attack) {
        this.hp -= attack
        if(this.hp <= 0) this.clear()
    }

    clear() {
        this.game.deleteTank(this)
    }
}
