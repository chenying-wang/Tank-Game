const KeyAction =  {
    'KeyW': tankGame => {
        tankGame.tanks[0].speed.setAngle(Tank.UP)
    },
    'KeyD': tankGame => {
        tankGame.tanks[0].speed.setAngle(Tank.RIGHT)
    },
    'KeyS': tankGame => {
        tankGame.tanks[0].speed.setAngle(Tank.DOWN)
    },
    'KeyA': tankGame => {
        tankGame.tanks[0].speed.setAngle(Tank.LEFT)
    },
    'KeyQ': tankGame => {
        tankGame.tanks[0].speed.setAngle(tankGame.tanks[0].speed.angle() - 10)
    },
    'KeyE': tankGame => {
        tankGame.tanks[0].speed.setAngle(tankGame.tanks[0].speed.angle() + 10)
    },
    'Space': tankGame => {
        if(tankGame.timer.pause == true) tankGame.start()
        else if(tankGame.timer.pause == false) tankGame.pause()
    },
    'KeyF': tankGame => {
        tankGame.tanks[0].fire()
    }
}
