class Entity {
    constructor(tankGame, position) {
        this.game = tankGame
        this.position = position
        this.width = 1
        this.height = 1
        this.speed = 0
        this.direction = Entity.UP
    }

    static new(...args) {
        return new this(...args)
    }

    move() {
        if(this.direction == Entity.UP) {
            this.position.y += this.speed
            if(this.position.y > Config.GRID_Y - this.height)
                this.position.y = Config.GRID_Y - this.height
        }
        else if(this.direction == Entity.RIGHT) {
            this.position.x += this.speed
            if(this.position.x > Config.GRID_X - this.width)
                this.position.x = Config.GRID_X - this.width
        }
        else if(this.direction == Entity.DOWN) {
            this.position.y -= this.speed
            if(this.position.y < 0)
                this.position.y = 0
        }
        else if(this.direction == Entity.LEFT) {
            this.position.x -= this.speed
            if(this.position.x < 0)
                this.position.x = 0
        }
    }

    draw() {
        this.game.draw(this.position, Config.ENTITY_COLOR)
    }
}

Entity.UP = 1
Entity.RIGHT = 2
Entity.LEFT = 3
Entity.DOWN = 4
