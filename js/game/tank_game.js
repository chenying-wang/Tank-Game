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

        for (let i = 0; i < Config.AGENT_ID.length; i++) {
            let initX = Math.floor(Util.random(Config.GRID_X))
            let initY = Math.floor(Util.random(Config.GRID_Y))
            let v = Vector.new(initX, initY)
            let tank = Tank.new(this, v, this.tankId[i])

            tank.speed.setLength(Config.TANK_SPEED)
            this.tanks.push(tank)
        }
    }

    _run() {
        super._run()

        if (this.tanks.length == 1) {
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
        for (let agent of this.agents) {
            if (agent == this.player) continue
            agent.loop()
        }
    }

    _over() {
        super._over()

        Main.updateTankGame(this.canvas)
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

    deleteTank(tank) {
        this.tanks = this.tanks.filter(element => element != tank)
    }

    deleteBullet(bullet) {
        this.bullets = this.bullets.filter(element => element != bullet)
    }
}
