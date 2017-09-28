class TankGame extends PixelGame{
    constructor(id, grid) {
        super(id, grid)
        this._initTanks()
        this.bullets = []
        this._initTimer()
    }

    _initTanks() {
        this.tanks = []
        for(let i = 0; i < 3; i++) {
            const initX = Math.floor(Config.GRID_X / 2 + i * 100 - 100)
            const initY = Math.floor(Config.GRID_Y / 2)
            const v = Vector.new(initX, initY)
            const tank = Tank.new(this, v)
            if(i != 0) tank.speed.setLength(0)
            this.tanks.push(tank)
        }
    }

    _initTimer() {
        this.timer = Timer.new(() => {
            this.clear()
            for (let bullet of this.bullets) {
                bullet.move()
                bullet.draw()
            }
            for (let tank of this.tanks) {
                tank.move()
                tank.cooldown()
                tank.draw()
            }
            for (let bullet of this.bullets) {
                for (let tank of this.tanks) {
                    bullet.collide(tank)
                }
            }
        }, Config.INTERVAL)
    }

    deleteTank(tank) {
        this.tanks = this.tanks.filter(element => element != tank)
        log(this.tanks.length)
    }

    deleteBullet(bullet) {
        this.bullets = this.bullets.filter(element => element != bullet)
    }
}
