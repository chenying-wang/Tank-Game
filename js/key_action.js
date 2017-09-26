const KeyAction =  {
    'w': tankGame => {
        tankGame.tanks[0].direction = Tank.UP
    },
    'd': tankGame => {
        tankGame.tanks[0].direction = Tank.RIGHT
    },
    's': tankGame => {
        tankGame.tanks[0].direction = Tank.DOWN
    },
    'a': tankGame => {
        tankGame.tanks[0].direction = Tank.LEFT
    },
    ' ': tankGame => {
        if(tankGame.timer.pause == true) tankGame.start()
        else if(tankGame.timer.pause == false) tankGame.pause()
    },
    'f': tankGame => {
        tankGame.tanks[0].fire()
    }
}
