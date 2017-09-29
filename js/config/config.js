"use strict"

const configInit = () => {
    Config.INTERVAL = 1000 / Config.FPS
    Config.TANK_SPEED /= Config.FPS
    Config.BULLET_SPEED /= Config.FPS
    Config.TANK_COOLDOWN *= Config.FPS
}

const Config = {

    DEBUG_DRAW: false,
    DEBUG_COLLIDE: false,

    FPS: 60,

    BACKGROUND_COLOR: 'rgb(0, 0, 0)',

    GRID_X: 400,
    GRID_Y: 225,

    // entity
    ENTITY_COLOR: 'rgb(255, 255, 255)',

    // tank
    TANK_NUMBER: 3,
    TANK_WIDTH: 11,
    TANK_HEIGHT: 11,
    TANK_SPEED: 20,
    TANK_COLOR: 'rgb(255, 255, 255)',
    TANK_HP: 10,
    TANK_COOLDOWN: 2,

    // bullet
    BULLET_WIDTH: 1,
    BULLET_HEIGHT: 3,
    BULLET_SPEED: 300,
    BULLET_COLOR: 'rgb(255, 0, 0)',
    BULLET_ATTACK: 1,

    // cd
    CD_COLOR: 'rgb(0, 255, 0)'
}

configInit()
