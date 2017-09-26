class Tank {
    constructor(tankGame, position) {
        this.game = tankGame
        this.position = position
        this.direction = Tank.STOP
    }

    static new(...args) {
        return new this(...args)
    }

    move() {
        if(this.direction == Tank.UP) {
            this.position.y += Tank.SPEED
            if(this.position.y >= Config.GRID_Y)
                this.position.y = Config.GRID_Y - 1
        }
        else if(this.direction == Tank.RIGHT) {
            this.position.x += Tank.SPEED
            if(this.position.x >= Config.GRID_X)
                this.position.x = Config.GRID_X - 1
        }
        else if(this.direction == Tank.DOWN) {
            this.position.y -= Tank.SPEED
            if(this.position.y < 0)
                this.position.y = 0
        }
        else if(this.direction == Tank.LEFT) {
            this.position.x -= Tank.SPEED
            if(this.position.x < 0)
                this.position.x = 0
        }
    }

    draw() {
        this.game.draw(this.position, Config.TANK_COLOR)
    }
}

Tank.STOP = 0
Tank.UP = 1
Tank.RIGHT = 2
Tank.LEFT = 3
Tank.DOWN = 4
Tank.SPEED = 1
