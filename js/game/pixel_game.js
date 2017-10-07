"use strict"

class PixelGame {
    constructor(episode, canvas, grid) {
        this.time = 0
        this.episode = episode
        this._initContext(canvas)
        this._initGrid(grid)
        this._initTimer()
    }

    static new(...args) {
        return new this(...args)
    }

    _initContext(canvas) {
        this.canvas = canvas
        if (canvas.getContext) {
            this.total = Vector.new(canvas.width, canvas.height)
            const ctx = canvas.getContext('2d')
            this.ctx = ctx
        }
    }

    _initGrid(grid) {
        this.unitWidth = this.total.x / grid.x
        this.unitHeight = this.total.y / grid.y
        this.origin = Entity.new(this, Vector.new(0, 0))
    }

    _initTimer() {
        this.timer = Timer.new(() => {
            this._run()
        }, Config.INTERVAL)
    }

    start() {
        this.timer.start()
    }

    _run() {
        this.time += Config.INTERVAL * Config.GAME_RATE
        this.clear()
        if(this.time > Config.GAME_TIMEOUT) {
            log('Time out')
            this._over()
        }
    }

    pause() {
        this.timer.stop()
    }

    _over() {
        this.timer.stop()
    }

    drawRect(position, color, size = Vector.new(1, 1), angle = Entity.UP, style = undefined) {
        const sizeMax = Math.max(size.x, size.y)
        if (position.x + sizeMax < 0 ||
            position.x - sizeMax > Config.GRID_X ||
            position.y + sizeMax < 0 |
            position.y - sizeMax > Config.GRID_Y) {
            return
        }

        const origin = Vector.new(
            (position.x + 0.5) * this.unitWidth,
            this.total.y - (position.y + 0.5) * this.unitHeight
        )
        this.ctx.translate(origin.x, origin.y)
        this.ctx.rotate(angle * Math.PI / 180)
        this.ctx.fillStyle = color

        let offsetX, offsetY
        for (let i = 0; i < size.x; i++) {
            for (let j = 0; j < size.y; j++) {
                offsetX = i - size.x / 2
                offsetY = j - size.y / 2
                if (style === undefined || style[j][i] != 0) {
                    this.ctx.fillRect(
                        offsetX * this.unitWidth,
                        offsetY * this.unitHeight,
                        this.unitWidth, this.unitHeight
                    )
                }
            }
        }
        this.ctx.rotate(-angle * Math.PI / 180)
        this.ctx.translate(-origin.x, -origin.y)

    }

    drawArc(position, color, radius = 1, start = 0, angle = 360) {
        let x = position.x
        let y = position.y
        radius *= this.unitWidth
        x *= this.unitWidth
        y = this.total.y - y * this.unitHeight

        start -= 90
        start = start / 180 * Math.PI
        angle = angle / 180 * Math.PI

        this.ctx.strokeStyle = color
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, start, start + angle)
        this.ctx.stroke()
    }

    drawFont(position, text, font, color) {
        let x = position.x
        let y = position.y
        x *= this.unitWidth
        y = this.total.y - y * this.unitHeight

        this.ctx.fillStyle = color
        this.ctx.font = font
        this.ctx.textBaseline = 'middle'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(text, x, y)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.total.x, this.total.y)
        this.ctx.fillStyle = Config.BACKGROUND_COLOR
        this.ctx.fillRect(0, 0, this.total.x, this.total.y)
    }
}
