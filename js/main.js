"use strict"

const log = console.log.bind(console)

class Main {
    static main() {
        Main.episode = 0
        const canvas = document.querySelector('#game')
        Main._setDiscription()

        Main.tankId = ['player', 'bot1', 'bot2']
        Main.tankType = ['agent', 'simple', 'simple']
        Main.agents = []
        let agent
        for (let i = 0; i < Config.TANK_NUMBER; i++) {
            if(Main.tankType[i] == 'agent') {
                agent = TankAgent.new()
            } else if(Main.tankType[i] == 'simple') {
                agent = SimpleAiTankAgent.new()
            } else if(Main.tankType[i] == 'dqn') {
                agent = DqnAiTankAgent.new()
            }
            if (Main.tankId[i] == Config.PLAYER_ID) {
                Main.player = agent
            }
            Main.agents.push(agent)
        }

        Main.mActionController = ActionController.new()
        Main.controlMode = Config.DEFAULT_CONTROL_MODE
        Main.updateTankGame(canvas)
        Main.toggleControlMode('set')

        if (Config.DEBUG_DRAW == true) {
            debug(Main.mTankGame)
        }
    }

    static updateTankGame(canvas) {
        log('episode ' + Main.episode)
        Main.mTankGame = TankGame.new(Main.episode, canvas,
            Vector.new(Config.GRID_X, Config.GRID_Y), Main.tankId)
        Main.mActionController.game = Main.mTankGame
        Main.setAgents()
        if(Main.player) {
            Main.mTankGame.setPlayer(Main.player)
        }
        Main.mTankGame.start()
        Main.episode++
    }

    static setAgents() {
        for (let i = 0; i < Config.TANK_NUMBER; i++) {
            Main.mTankGame.setAgent(i, Main.agents[i])
            Main.agents[i].reward = 0
        }
    }

    static toggleControlMode(controlMode) {
        if (controlMode != 'set') {
            Main.mActionController.removeActions(Main.controlMode)
            if (Main.controlMode == 'mouse') {
                Main.controlMode = 'keyboard'
            } else {
                Main.controlMode = 'mouse'
            }
        }
        Main.mActionController.addActions(Main.controlMode)
        document.querySelector('#control-mode').value = 'Control by ' + Main.controlMode
    }

    static toggleDiscription() {
        const div = document.querySelector('#discription-content')
        if (div.style.visibility == 'visible') {
            div.style.visibility = 'hidden'
        } else if (div.style.visibility == 'hidden') {
            div.style.visibility = 'visible'
        } else {
            div.style.visibility = 'visible'
        }
    }

    static _setDiscription() {
        const div = document.querySelector('#discription-content')
        if (div == null) return
        for (let action in KeyActions) {
            let discription = "[" + action + "]" + " : " + KeyActions[action].discription
            div.innerHTML += "<p>" + discription + "</p>"
        }
    }

    static debug(tankGame) {
        document.querySelector('#debug').style.display = 'block'
    }

    static debugDraw() {
        if (Config.DEBUG_DRAW != true) return
        const x = Number.parseInt(document.querySelector('#x').value)
        const y = Number.parseInt(document.querySelector('#y').value)
        const w = Number.parseInt(document.querySelector('#w').value)
        const h = Number.parseInt(document.querySelector('#h').value)
        Main.mTankGame.drawRect(Vector.new(x, y), 'rgb(255, 255, 255)', Vector.new(w, h))
    }

    static debugDrawArc() {
        if (Config.DEBUG_DRAW != true) return
        const x = Number.parseInt(document.querySelector('#x').value)
        const y = Number.parseInt(document.querySelector('#y').value)
        const w = Number.parseInt(document.querySelector('#w').value)
        Main.mTankGame.drawArc(Vector.new(x, y), 'rgb(255, 255, 255)', w)
    }
}
