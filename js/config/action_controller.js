"use strict"

class ActionController {
    constructor() {
        this.actions = {
            keyboard: [
                {
                    element: window,
                    type: 'keydown',
                    function: event => {
                        if (KeyActions[event.code] && KeyActions[event.code]['keydown']) {
                            event.preventDefault()
                            if(this.game.player == undefined) return
                            KeyActions[event.code]['keydown'](this.game)
                        }
                    }
                }
            ],
            mouse: [
                {
                    element: document.getElementById('game'),
                    type: 'mousemove',
                    function: event => {
                        event.preventDefault()
                        if(this.game.player == undefined) return
                        let dest = Vector.new(event.offsetX / this.game.unitWidth,
                            (this.game.total.y - event.offsetY) / this.game.unitHeight)
                            this.game.player && 
                                this.game.player.move(this.game.player.tank.position.angle(dest))
                    }
                },
                {
                    element: document.getElementById('game'),
                    type: 'click',
                    function: event => {
                        event.preventDefault()
                        if(this.game.player == undefined) return
                        this.game.player.loop()
                    }
                },
                {
                    element: document.getElementById('game'),
                    type: 'dblclick',
                    function: event => {
                        event.preventDefault()
                        if (this.game.timer.pause == true) this.game.start()
                        else if (this.game.timer.pause == false) this.game.pause()
                    }
                }
            ],
            test: [
                {
                    element: document.getElementById('game'),
                    type: 'click',
                    function: event => {
                        if (this.game.timer.pause == true) this.game.start()
                        else if (this.game.timer.pause == false) this.game.pause()
                    }
                }
            ]
        }
    }

    static new(...args) {
        return new this(...args)
    }

    addActions(groupName) {
        if(this.actions[groupName]) {
            for (let action of this.actions[groupName]) {

                action.element.addEventListener(
                    action.type, action.function
                )
            }
        }
    }

    removeActions(groupName) {
        if(this.actions[groupName]){
            for (let action of this.actions[groupName]) {
                action.element.removeEventListener(
                    action.type, action.function
                )
            }
        }
    }

}
