"use strict"

class TankGame extends PixelGame {
    constructor(canvas, grid) {
        super(canvas, grid)
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
                log('reward', agent.tank.id, agent.reward)
            }

        }, Config.INTERVAL)
    }

    deleteTank(tank) {
        this.tanks = this.tanks.filter(element => element != tank)
    }

    deleteBullet(bullet) {
        this.bullets = this.bullets.filter(element => element != bullet)
    }
}
