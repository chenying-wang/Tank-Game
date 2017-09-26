class TankGame extends PixelGame{
    constructor(id, grid) {
        super(id, grid)

        this._initTanks()
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
            this.tanks[0].move()
            this.tanks[0].draw()
        }, Config.INTERVAL)
    }
}
