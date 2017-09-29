"use strict"

const KeyAction =  {
    'KeyW': tankGame => {
        tankGame.player.move(Tank.UP)
    },
    'KeyD': tankGame => {
        tankGame.player.move(Tank.RIGHT)
    },
    'KeyS': tankGame => {
        tankGame.player.move(Tank.DOWN)
    },
    'KeyA': tankGame => {
        tankGame.player.move(Tank.LEFT)
    },
    'KeyQ': tankGame => {
        tankGame.player.move(player.tank.speed.angle() - 10)
    },
    'KeyE': tankGame => {
        tankGame.player.move(player.tank.speed.angle() + 10)
    },
    'KeyC': () => {
        Config.DEBUG_COLLIDE = !Config.DEBUG_COLLIDE
    },
    'Space': tankGame => {
        if(tankGame.timer.pause == true) tankGame.start()
        else if(tankGame.timer.pause == false) tankGame.pause()
    },
    'KeyF': tankGame => {
        tankGame.player.fire()
    }
}
