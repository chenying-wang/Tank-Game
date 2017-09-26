class Tank extends Entity {
    constructor(tankGame, position) {
        super(tankGame, position)
        this.width = Config.TANK_WIDTH
        this.height = Config.TANK_WIDTH
        this.speed = Config.TANK_SPEED
        this.direction = Tank.UP

        this.style = [
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
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
    }

    draw() {
        this.game.draw(this.position, Config.TANK_COLOR,
            this.width, this.height, this.style, this.direction)
    }

    fire() {
        log('fire')
        let bulletPosition
        log(this.position)
        if(this.direction == Tank.UP) {
            bulletPosition = Vector.new(
                this.position.x + (this.width - 1) / 2,
                this.position.y + this.height
            )
        }
        else if(this.direction == Tank.RIGHT) {
            bulletPosition = Vector.new(
                this.position.x + this.width,
                this.position.y + (this.height - 1) / 2
            )
        }
        else if(this.direction == Tank.DOWN) {
            bulletPosition = Vector.new(
                this.position.x + (this.width - 1) / 2,
                this.position.y - 1
            )
        }
        else if(this.direction == Tank.LEFT) {
            bulletPosition = Vector.new(
                this.position.x - 1,
                this.position.y + (this.height - 1) / 2
            )
        }
        let bullet = Entity.new(this.game, bulletPosition)
        bullet.speed = 6
        bullet.direction = this.direction
        this.game.bullets.push(bullet)
    }
}
