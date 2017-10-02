"use strict"

const log = console.log.bind(console)

class Main {
    static main() {
        Main.episode = 0
        const canvas = document.querySelector('#game')
        Main._setDiscription()

        Main.mActionController = ActionController.new()
        Main.controlMode = Config.DEFAULT_CONTROL_MODE
        Main.updateTankGame(canvas)
        Main.toggleControlMode('set')

        if (Config.DEBUG_DRAW == true) {
            debug(Main.mTankGame)
        }
    }

    static updateTankGame(canvas) {
        Main.mTankGame = TankGame.new(Main.episode, canvas,
            Vector.new(Config.GRID_X, Config.GRID_Y))
        Main.mActionController.game = Main.mTankGame
        Main.mTankGame.start()
        // Main.mTankGame.pause()
        Main.episode++
    }

    static toggleControlMode(controlMode) {
        if(controlMode != 'set') {
            Main.mActionController.removeActions(Main.controlMode)
            if(Main.controlMode == 'mouse') {
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
