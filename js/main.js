const log = console.log.bind(console)

class TankGame {
    constructor(id, grid) {
        this._initCanvas(id)
        this._initGrid(grid)
    }

    static new(...args) {
        return new this(...args)
    }

    _initCanvas(id) {
        this.id = id
        const canvas = document.querySelector('#' + id)
        if (canvas.getContext) {
            this.totalWidth = canvas.width
            this.totalHeight = canvas.height
            const ctx = canvas.getContext('2d')
            this.ctx = ctx
        }
    }

    _initGrid(grid) {
        this.unitWidth = this.totalWidth / grid.x
        this.unitHeight = this.totalHeight / grid.y
    }

    draw(vector, color) {
        this.ctx.fillStyle = color
        const x = vector.x * this.unitWidth
        const y = this.totalHeight - this.unitHeight - vector.y * this.unitHeight
        if (x < 0 || x > this.totalWidth || y < 0 || y > this.totalHeight) {
            return
        }
        this.ctx.fillRect(x, y, this.unitWidth, this.unitHeight)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.totalWidth, this.totalHeight)
    }
}

const debug = tankGame => {
    window.debugTankGame = tankGame
    document.querySelector('#debug').style.visibility = 'visible'
}

const debugDraw = () => {
    const x = document.querySelector('#x').value
    const y = document.querySelector('#y').value
    window.debugTankGame.draw(Vector.new(x, y), "rgb(0, 0, 0)")
}

const main = () => {
    let mTankGame = TankGame.new('game', Vector.new(80, 45))
    let timer = Timer.new(() => {
        mTankGame.clear()
    }, 1000)
    timer.start()
    debug(mTankGame)
}

window.onload = () => {
    main()
}
