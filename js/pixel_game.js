class PixelGame {
    constructor(id, grid) {
        this._initCanvas(id)
        this._initGrid(grid)
        this._initTanks()
        this._initTimer()
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

    _initTimer() {
        this.timer = Timer.new(() => {
            this.clear()
        }, Config.INTERVAL)
    }

    start() {
        this.timer.start()
    }

    pause() {
        this.timer.stop()
    }

    draw(vector, color, width = 1, height = 1, style = [[]], angle = Entity.UP) {
        this.ctx.fillStyle = color
        const x = vector.x * this.unitWidth
        const y = this.totalHeight - this.unitHeight * height - vector.y * this.unitHeight
        if (x < 0 || x > this.totalWidth || y < 0 || y > this.totalHeight) {
            return
        }
        let offsetX, offsetY
        for(let i = 0; i < width; i++) {
            for(let j = 0; j < height; j++) {
                if(angle == Entity.UP || angle == Entity.STOP) {
                    offsetX = i
                    offsetY = j
                }
                else if(angle == Entity.RIGHT) {
                    offsetX = height - j - 1
                    offsetY = i
                }
                else if(angle == Entity.DOWN) {
                    offsetX = width - i - 1
                    offsetY = height - j - 1
                }
                else if (angle == Entity.LEFT) {
                    offsetX = j
                    offsetY = width - i -1
                }

                if(style[j][i] === undefined || style[j][i] !== 0) {
                    this.ctx.fillRect(x + this.unitWidth * offsetX,
                        y + this.unitHeight * offsetY,
                        this.unitWidth, this.unitHeight)
                }
            }
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.totalWidth, this.totalHeight)
        this.ctx.fillStyle = Config.BACKGROUND_COLOR
        this.ctx.fillRect(0, 0, this.totalWidth, this.totalHeight)
    }
}
