class TankGame extends PixelGame{
    constructor(id, grid) {
        super(id, grid)
        this._initTanks()
        this.bullets = []
        this._initTimer()
    }

    _initTanks() {
        this.tanks = []
        const initX = Math.floor(Config.GRID_X / 2)
        const initY = Math.floor(Config.GRID_Y / 2)
        const v = Vector.new(initX, initY)
        const tank = Tank.new(this, v)
        this.tanks.push(tank)
    }

    _initTimer() {
        this.timer = Timer.new(() => {
            this.clear()
            for (let tank of this.tanks) {
                tank.move()
                tank.draw()
            }
            for (let bullet of this.bullets) {
                bullet.move()
                bullet.draw()
            }
        }, Config.INTERVAL)
    }
}
