const log = console.log.bind(console)

const debug = tankGame => {
    window.debugTankGame = tankGame
    document.querySelector('#debug').style.visibility = 'visible'
}

const debugDraw = () => {
    const x = document.querySelector('#x').value
    const y = document.querySelector('#y').value
    const w = document.querySelector('#w').value
    const h = document.querySelector('#h').value
    window.debugTankGame.draw(Vector.new(x, y), 'rgb(255, 255, 255)', w ,h)
}

const main = () => {
    const mTankGame = TankGame.new('game', Vector.new(Config.GRID_X, Config.GRID_Y))
    window.addEventListener('keydown', event => {
        KeyAction[event.key] && KeyAction[event.key](mTankGame)
    })
    mTankGame.start()
    mTankGame.pause()
    debug(mTankGame)
}

window.onload = () => {
    main()
}
