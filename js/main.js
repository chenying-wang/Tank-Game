const log = console.log.bind(console)

const debug = tankGame => {
    window.debugTankGame = tankGame
    document.querySelector('#debug').style.visibility = 'visible'
}

const debugDraw = () => {
    const x = Number.parseInt(document.querySelector('#x').value)
    const y = Number.parseInt(document.querySelector('#y').value)
    const w = Number.parseInt(document.querySelector('#w').value)
    const h = Number.parseInt(document.querySelector('#h').value)
    window.debugTankGame.draw(Vector.new(x, y), 'rgb(255, 255, 255)', Vector.new(w, h))
}

const debugDrawArc = () => {
    const x = Number.parseInt(document.querySelector('#x').value)
    const y = Number.parseInt(document.querySelector('#y').value)
    const w = Number.parseInt(document.querySelector('#w').value)
    window.debugTankGame.drawArc(Vector.new(x, y), 'rgb(255, 255, 255)', w)
}

const main = () => {
    const mTankGame = TankGame.new('game', Vector.new(Config.GRID_X, Config.GRID_Y))
    window.addEventListener('keydown', event => {
        KeyAction[event.code] && KeyAction[event.code](mTankGame)
    })
    mTankGame.start()
    mTankGame.pause()
    debug(mTankGame)
}

window.onload = () => {
    main()
}
