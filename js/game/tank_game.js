"use strict"

class TankGame extends PixelGame {
    constructor(episode, canvas, grid, tankId) {
        super(episode, canvas, grid)

        this.tankId = tankId
        this.clear()
        this._initTanks()
        this.bullets = []
        this._initTimer()
    }

    _initTanks() {
        this.tanks = []
        this.agents = []

        for (let i = 0; i < Config.TANK_ID.length; i++) {
            let initX = Math.floor(Util.random(Config.GRID_X))
            let initY = Math.floor(Util.random(Config.GRID_Y))
            let v = Vector.new(initX, initY)
            let tank = Tank.new(this, v, this.tankId[i])

            tank.speed.setLength(Config.TANK_SPEED)
            this.tanks.push(tank)
        }
    }

    _initTimer() {
        this.timer = Timer.new(() => {
            this.clear()
            if (this.tanks.length == 1) {
                this._over()
                return
            }

            for (let agent of this.agents) {
                if (agent == this.player) continue
                agent.loop()
            }
            for (let bullet of this.bullets) {
                bullet.move()
                bullet.draw()
            }
            for (let tank of this.tanks) {
                tank.move()
                tank.cooldown()
                for (let otherTank of this.tanks) {
                    if(otherTank == tank) continue
                    otherTank.collide(tank)
                }
                tank.draw()
            }
            for (let bullet of this.bullets) {
                for (let tank of this.tanks) {
                    bullet.collide(tank)
                }
            }
        }, Config.INTERVAL)
    }

    setAgent(id, agent) {
        this.tanks[id].agent = agent
        this.tanks[id].agent.tank = this.tanks[id]
        this.tanks[id].agent.game = this
        this.tanks[id].agent.init()
        this.agents[id] = this.tanks[id].agent
    }

    setPlayer(agent) {
        this.player = agent
    }

    _over() {
        this.timer.stop()
        Main.updateTankGame(this.canvas)
    }

    deleteTank(tank) {
        this.tanks = this.tanks.filter(element => element != tank)
    }

    deleteBullet(bullet) {
        this.bullets = this.bullets.filter(element => element != bullet)
    }
}
