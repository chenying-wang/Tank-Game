class Bullet extends Entity {
    constructor(tankGame, position) {
        super(tankGame, position)

        this.size.set(Config.BULLET_WIDTH, Config.BULLET_HEIGHT)
        this.color = Config.BULLET_COLOR
    }

    move() {
        super.move()
    }

}
