const log = console.log.bind(console)

const debug = tankGame => {
    window.debugTankGame = tankGame
    document.querySelector('#debug').style.visibility = 'visible'
}

const debugDraw = () => {
    const x = document.querySelector('#x').value
    const y = document.querySelector('#y').value
    window.debugTankGame.draw(Vector.new(x, y), 'rgb(255, 255, 255)')
}

const main = () => {
    const mTankGame = TankGame.new('game', Vector.new(Config.GRID_X, Config.GRID_Y))
    window.addEventListener('keydown', event => {
        log(event)
        KeyAction[event.key] && KeyAction[event.key](mTankGame)
    })
    mTankGame.start()
    debug(mTankGame)
}

window.onload = () => {
    main()
}
