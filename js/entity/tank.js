"use strict"

class Tank extends Entity {
    constructor(tankGame, position, id = null) {
        super(tankGame, position, id)

        this.patterns.push(TankPattern.new(this))
        if (this.id == Config.PLAYER_ID) {
            this.patterns.push(CooldownIndicator.new(this, Vector.new(16, 16), this.game.origin))
            this.patterns.push(RewardIndicator.new(this, Vector.new(32, 16), this.game.origin))
        }
        this.patterns.push(HpIndicator.new(this, Vector.new(0, Math.floor(Config.TANK_HEIGHT / 1.5))))

        this.size.set(Config.TANK_WIDTH, Config.TANK_HEIGHT)
        this.speed.set(0, Config.TANK_SPEED)
        this.hp = Config.TANK_HP
        this.cd = 0
    }

    move() {
        super.move()

        if (this.position.x < 0) this.position.x = 0
        else if (this.position.x > Config.GRID_X) this.position.x = Config.GRID_X
        if (this.position.y < 0) this.position.y = 0
        else if (this.position.y > Config.GRID_Y) this.position.y = Config.GRID_Y
    }

    cooldown() {
        if (this.cd <= 0) return
        this.cd -= 1
    }

    fire() {
        if (this.cd > 0) return
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
        bullet.attacker = this
        this.game.bullets.push(bullet)
    }

    damage(attack) {
        this.hp -= attack
        if (this.hp <= 0) {
            this.agent.reward += Config.REWARD_DIE
            this.clear()
        }
    }

    collideCallback(entity) {
        if(entity instanceof Tank) {
            let offset = Vector.new()
            const dx = Math.abs(this.position.x - entity.position.x)
            const dy = Math.abs(this.position.y - entity.position.y)
            const dxmin = (this.collideSize.x + entity.collideSize.x) / 2
            const dymin = (this.collideSize.y + entity.collideSize.y) / 2
            const center = this.position.add(entity.position).multiply(0.5)
            const angle = this.position.angle(entity.position)
            if(dx > dy) {
                offset.x = (dxmin - dx) / 2
                offset.x *= Math.sign(Math.sin(angle * Math.PI / 180))
                offset.y = offset.x / Math.tan(angle * Math.PI /180)

            }
            else {
                offset.y = (dymin - dy) / 2
                offset.y *= Math.sign(Math.cos(angle * Math.PI / 180))
                offset.x = offset.y * Math.tan(angle * Math.PI /180)
            }
            this.position.minusEqual(offset)
            entity.position.addEqual(offset)
        }
    }

    clear() {
        this.game.deleteTank(this)
    }
}
