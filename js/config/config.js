"use strict"

const Config = {

    _init: () => {
        Config.INTERVAL = 1000 / (Config.FPS * Config.GAME_RATE)
        Config.TANK_SPEED /= Config.FPS
        Config.BULLET_SPEED /= Config.FPS
        Config.TANK_COOLDOWN *= Config.FPS
    },

    // debug
    DEBUG_LOG: true,
    DEBUG_DRAW: false,
    DEBUG_COLLIDE: false,

    // basic
    DEFAULT_CONTROL_MODE: 'mouse',
    TANK_ID: ['bot0', 'bot1', 'bot2', 'bot3', 'bot4', 'bot5', 'bot6', 'bot7', 'bot8', 'bot9'],
    TANK_TYPE: ['dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn', 'dqn'],
    // TANK_ID: ['bot0', 'bot1', 'bot2'],
    // TANK_TYPE: ['dqn', 'dqn', 'dqn'],
    PLAYER_ID: 'player',
    GAME_RATE: 20,
    FPS: 50,

    // canvas
    CANVAS_ID: 'game',
    BACKGROUND_COLOR: 'rgb(0, 0, 0)',

    // grid
    GRID_X: 400,
    GRID_Y: 225,

    // pattern
    PATTERN_COLOR: 'rgb(255, 255, 255)',

    // tank
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

    // reward
    REWARD_DAMAGE: 1,
    REWARD_DIE: -5
}

Config._init()
