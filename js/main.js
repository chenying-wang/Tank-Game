"use strict"

const log = console.log.bind(console)

const debug = tankGame => {
    window.debugTankGame = tankGame
    document.querySelector('#debug').style.display = 'block'
}

const debugDraw = () => {
    if (Config.DEBUG_DRAW != true) return
    const x = Number.parseInt(document.querySelector('#x').value)
    const y = Number.parseInt(document.querySelector('#y').value)
    const w = Number.parseInt(document.querySelector('#w').value)
    const h = Number.parseInt(document.querySelector('#h').value)
    window.debugTankGame.drawRect(Vector.new(x, y), 'rgb(255, 255, 255)', Vector.new(w, h))
}

const debugDrawArc = () => {
    if (Config.DEBUG_DRAW != true) return
    const x = Number.parseInt(document.querySelector('#x').value)
    const y = Number.parseInt(document.querySelector('#y').value)
    const w = Number.parseInt(document.querySelector('#w').value)
    window.debugTankGame.drawArc(Vector.new(x, y), 'rgb(255, 255, 255)', w)
}

const setDiscription = () => {
    const div = document.querySelector('#discription-content')
    if (div == null) return
    for (let action in KeyActions) {
        let discription = "[" + action + "]" + " : " + KeyActions[action].discription
        div.innerHTML += "<p>" + discription + "</p>"
    }
}

const toggleDiscription = () => {
    const div = document.querySelector('#discription-content')
    log(div.style.visibility)
    if (div.style.visibility == 'visible') {
        div.style.visibility = 'hidden'
    } else if (div.style.visibility == 'hidden') {
        div.style.visibility = 'visible'
    } else {
        div.style.visibility = 'visible'
    }
}

const main = () => {
    setDiscription()

    const mTankGame = TankGame.new('game', Vector.new(Config.GRID_X, Config.GRID_Y))
    mTankGame.start()
    mTankGame.pause()

    window.addEventListener('keydown', event => {
        KeyActions[event.code]['keydown'] && KeyActions[event.code]['keydown'](mTankGame)
    })

    if (Config.DEBUG_DRAW == true) {
        debug(mTankGame)
    }
}
