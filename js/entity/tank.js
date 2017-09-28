class Tank extends Entity {
    constructor(tankGame, position) {
        super(tankGame, position)

        this.size.set(Config.TANK_WIDTH, Config.TANK_HEIGHT)
        this.speed.set(0, Config.TANK_SPEED)
        this.style = [
            [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1]
        ]
        this.color = Config.TANK_COLOR
        this.cd = 0
    }

    cooldown() {
        if(this.cd == 0) return
        this.cd -= 1
    }

    draw() {
        this.game.draw(this.position, this.color,
            this.size, this.speed.angle(), this.style)
    }

    fire() {
        if(this.cd != 0) return
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
}
