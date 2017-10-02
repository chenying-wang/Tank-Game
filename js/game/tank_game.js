"use strict"

class TankGame extends PixelGame {
    constructor(episode, canvas, grid) {
        super(episode, canvas, grid)

        this.clear()
        this._initTanks()
        this.bullets = []
        this._initTimer()
    }

    _initTanks() {
        this.tanks = []
        this.agents = []
        this.tankId = ['player', 'bot1', 'bot2']

        for (let i = 0; i < Config.TANK_NUMBER; i++) {
            let initX = Math.floor(Config.GRID_X / 2 + i * 100 - 100)
            let initY = Math.floor(Config.GRID_Y / 2)
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
                agent.updateStatus()
                if (agent == this.player) continue
                agent.action()
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
