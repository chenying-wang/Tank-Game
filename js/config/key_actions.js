"use strict"

const KeyActions = {
    KeyW: {
        description: 'Move up',
        keydown: tankGame => {
            tankGame.player.move(Tank.UP)
        }
    },

    KeyA: {
        description: 'Move left',
        keydown: tankGame => {
            tankGame.player.move(Tank.LEFT)
        }
    },

    KeyS: {
        description: 'Move down',
        keydown: tankGame => {
            tankGame.player.move(Tank.DOWN)
        }
    },

    KeyD: {
        description: 'Move right',
        keydown: tankGame => {
            tankGame.player.move(Tank.RIGHT)
        }
    },

    KeyF: {
        description: 'Fire',
        keydown: tankGame => {
            tankGame.player.fire()
        }
    },

    KeyQ: {
        description: '[Experimental] Yaw left',
        keydown: tankGame => {
            tankGame.player.move(tankGame.player.tank.speed.angle() - 10)
        }
    },

    KeyE: {
        description: '[Experimental] Yaw right',
        keydown: tankGame => {
            tankGame.player.move(tankGame.player.tank.speed.angle() + 10)
        }
    },

    Space: {
        description: 'Start/Pause',
        keydown: tankGame => {
            if (tankGame.timer.pause === true) tankGame.start()
            else if (tankGame.timer.pause === false) tankGame.pause()
        }
    },

    KeyC: {
        description: 'Debug Collision System',
        keydown: () => {
            Config.DEBUG_COLLIDE = !Config.DEBUG_COLLIDE
        }
    }
}
