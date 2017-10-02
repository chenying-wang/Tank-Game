"use strict"

const KeyActions = {
    KeyW: {
        discription: 'Move up',
        keydown: tankGame => {
            tankGame.player.move(Tank.UP)
        }
    },

    KeyA: {
        discription: 'Move left',
        keydown: tankGame => {
            tankGame.player.move(Tank.LEFT)
        }
    },

    KeyS: {
        discription: 'Move down',
        keydown: tankGame => {
            tankGame.player.move(Tank.DOWN)
        }
    },

    KeyD: {
        discription: 'Move right',
        keydown: tankGame => {
            tankGame.player.move(Tank.RIGHT)
        }
    },

    KeyF: {
        discription: 'Fire',
        keydown: tankGame => {
            tankGame.player.fire()
        }
    },

    KeyQ: {
        discription: '[Experimental] Yaw left',
        keydown: tankGame => {
            tankGame.player.move(tankGame.player.tank.speed.angle() - 10)
        }
    },

    KeyE: {
        discription: '[Experimental] Yaw right',
        keydown: tankGame => {
            tankGame.player.move(tankGame.player.tank.speed.angle() + 10)
        }
    },

    Space: {
        discription: 'Start/Pause',
        keydown: tankGame => {
            if (tankGame.timer.pause == true) tankGame.start()
            else if (tankGame.timer.pause == false) tankGame.pause()
        }
    },

    KeyC: {
        discription: 'Debug Collision System',
        keydown: () => {
            Config.DEBUG_COLLIDE = !Config.DEBUG_COLLIDE
        }
    }
}
