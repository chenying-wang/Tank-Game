"use strict"

class TankGame extends PixelGame {
    constructor(episode, canvas, grid) {
        super(episode, canvas, grid)

        log('episode ' + this.episode)
        this.clear()
        this._initTanks()
        this.bullets = []
        this._initTimer()
    }

    _initTanks() {
        this.tanks = []
        this.agents = []
        let initX = Math.floor(Config.GRID_X / 2 - 100)
        let initY = Math.floor(Config.GRID_Y / 2)
        let v = Vector.new(initX, initY)
        let tank = Tank.new(this, v, 'player')
        let agent = TankAgent.new(tank)
        this.tanks.push(tank)
        this.agents[0] = agent
        this.player = this.agents[0]
        for (let i = 1; i < Config.TANK_NUMBER; i++) {
            initX = Math.floor(Config.GRID_X / 2 + i * 100 - 100)
            initY = Math.floor(Config.GRID_Y / 2)
            v = Vector.new(initX, initY)
            tank = Tank.new(this, v, i)
            agent = TankAgent.new(tank)
            tank.speed.setLength(0)
            this.tanks.push(tank)
            this.agents[i] = agent
        }
    }

    _initTimer() {
        this.timer = Timer.new(() => {
            this.clear()
            if(this.tanks.length == 1) {
                this._over()
                return
            }

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
            for(let agent of this.agents) {
                agent.updateStatus()
                // log('reward', agent.tank.id, agent.reward)
            }
        }, Config.INTERVAL)
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
