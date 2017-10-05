"use strict"

let log

class Main {
    static main() {
        Main.toggleLog(false)

        Main.episode = 0
        const canvas = document.getElementById('game')
        Main._setDiscription()

        Main.tankId = Config.TANK_ID
        Main.tankType = Config.TANK_TYPE
        Main.agents = []
        let agent
        for (let i = 0; i < Config.TANK_ID.length; i++) {
            if(Main.tankType[i] == 'agent') {
                agent = TankAgent.new()
            } else if(Main.tankType[i] == 'simple') {
                agent = SimpleAiTankAgent.new()
            } else if(Main.tankType[i] == 'dqn') {
                agent = DqnAiTankAgent.new()
            } else {
                agent = AiTankAgent.new()
            }
            if (Main.tankId[i] == Config.PLAYER_ID) {
                Main.player = agent
            }
            Main.agents.push(agent)
        }
        
        Main.mActionController = ActionController.new()
        if(this.player != undefined) {
            Main.controlMode = Config.DEFAULT_CONTROL_MODE
        } else {
            Main.controlMode = 'test'
        }
        Main.updateTankGame(canvas)
        Main.toggleControlMode('set')
        if (Config.DEBUG_DRAW == true) {
            debug(Main.mTankGame)
        }
    }

    static updateTankGame(canvas) {
        log('Episode ' + Main.episode)
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
        for (let i = 0; i < Config.TANK_ID.length; i++) {
            Main.mTankGame.setAgent(i, Main.agents[i])
        }
    }

    static toggleControlMode(controlMode) {
        if (controlMode != 'set') {
            Main.mActionController.removeActions(Main.controlMode)
            if (Main.controlMode == 'test') {
                Main.controlMode = 'mouse'
            } else if(Main.controlMode == 'mouse') {
                Main.controlMode = 'keyboard'
            } else {
                Main.controlMode = 'test'
            }
        }
        Main.mActionController.addActions(Main.controlMode)
        document.getElementById('control-mode').value = 'Control by ' + Main.controlMode
    }

    static toggleDiscription() {
        const div = document.getElementById('discription-content')
        if (div.style.visibility == 'visible') {
            div.style.visibility = 'hidden'
        } else if (div.style.visibility == 'hidden') {
            div.style.visibility = 'visible'
        } else {
            div.style.visibility = 'visible'
        }
    }

    static toggleLog(change) {
        if(change) {
            Config.DEBUG_LOG = !Config.DEBUG_LOG
        }
        document.getElementById('log').value = 'Log: ' + Config.DEBUG_LOG
        if(Config.DEBUG_LOG) {
            log = console.log.bind(console)
        } else {
            log = (...args) => {}
        }
    }

    static _setDiscription() {
        const div = document.getElementById('discription-content')
        if (div == null) return
        for (let action in KeyActions) {
            let discription = "[" + action + "]" + " : " + KeyActions[action].discription
            div.innerHTML += "<p>" + discription + "</p>"
        }
    }

    static debug(tankGame) {
        document.getElementById('debug').style.display = 'block'
    }

    static debugDraw() {
        if (Config.DEBUG_DRAW != true) return
        const x = Number.parseInt(document.getElementById('x').value)
        const y = Number.parseInt(document.getElementById('y').value)
        const w = Number.parseInt(document.getElementById('w').value)
        const h = Number.parseInt(document.getElementById('h').value)
        Main.mTankGame.drawRect(Vector.new(x, y), 'rgb(255, 255, 255)', Vector.new(w, h))
    }

    static debugDrawArc() {
        if (Config.DEBUG_DRAW != true) return
        const x = Number.parseInt(document.getElementById('x').value)
        const y = Number.parseInt(document.getElementById('y').value)
        const w = Number.parseInt(document.getElementById('w').value)
        Main.mTankGame.drawArc(Vector.new(x, y), 'rgb(255, 255, 255)', w)
    }
}
