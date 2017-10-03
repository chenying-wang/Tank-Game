"use strict"

const Config = {

    _init: () => {
        Config.INTERVAL = 1000 / (Config.FPS * Config.GAME_RATE)
        Config.TANK_SPEED /= Config.FPS
        Config.BULLET_SPEED /= Config.FPS
        Config.TANK_COOLDOWN *= Config.FPS
    },

    // debug
    DEBUG_DRAW: false,
    DEBUG_COLLIDE: false,

    DEFAULT_CONTROL_MODE: 'mouse',
    GAME_RATE: 1,
    FPS: 60,
    PLAYER_ID: 'player',

    // canvas
    BACKGROUND_COLOR: 'rgb(0, 0, 0)',

    // grid
    GRID_X: 400,
    GRID_Y: 225,

    // pattern
    PATTERN_COLOR: 'rgb(255, 255, 255)',

    // tank
    TANK_NUMBER: 3,
    TANK_WIDTH: 11,
    TANK_HEIGHT: 11,
    TANK_SPEED: 20,
    TANK_COLOR: 'rgb(255, 255, 255)',
    TANK_HP: 10,
    TANK_COOLDOWN: 1,

    // bullet
    BULLET_WIDTH: 1,
    BULLET_HEIGHT: 3,
    BULLET_SPEED: 100,
    BULLET_COLOR: 'rgb(255, 0, 0)',
    BULLET_ATTACK: 1,

    // cd indicator
    CD_COLOR: 'rgb(0, 255, 255)',

    // hp indicator
    HP_HEIGHT: 2,
    HP_COLOR: 'rgb(255, 0, 0)',
    HP_COLOR_REMAIN: 'rgb(0, 255, 0)',

    // status
    STATUS_DISTANCE_X: 0,
    STATUS_DISTANCE_Y: 1,
    STATUS_SPEED_ANGLE: 2,

    // reward
    REWARD_DAMAGE: 1,
    REWARD_DIE: -5
}

Config._init()
