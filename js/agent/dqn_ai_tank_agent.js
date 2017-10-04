"use strict"

class DqnAiTankAgent extends AiTankAgent {
    constructor() {
        super()

        this.EXPLORERATION = 0.02
        this.LEARNING_RATE = 0.1
        this.DISCOUNT_FACTOR = 0.9

        this.REPLAY_CAPACITY = 32
        this.STATUS_INDEX = 0
        this.ACTION_INDEX = 1
        this.REWARD_INDEX = 2
        this.NEXT_STATUS_INDEX = 3

        this.action = Entity.UP
        this.lastStatus = []
        this.lastReward = 0
        this.replay = []

        this.qNetwork  = NeuralNetwork.new()
    }

    _actionValueFunction(status) {
        this.qNetwork.input(status)
        return this.qNetwork.output()
    }

    loop() {
        this._updateStatus()
        this._storeTransition()
        this._updateActionValueFunction()

        this.lastStatus = this.status
        this.lastReward = this.reward
        this._action()
    }

    _action() {
        if(Util.random() < this.EXPLORERATION) {
            const dx = Util.random(1, -1)
            const dy = Util.random(1, -1)
            this.action = Math.round(Vector.new(dx, dy).angle())
            this.move(this.action)
        } else {
            
        }
        this.fire()
    }

    _storeTransition() {
        let minibatch = []
        minibatch[this.STATUS_INDEX] = this.lastStatus
        minibatch[this.ACTION_INDEX] = this.action
        minibatch[this.REWARD_INDEX] = this.reward - this.lastReward
        minibatch[this.NEXT_STATUS_INDEX] = this.status
        this.replay.push(minibatch)
        if(this.replay.length > this.REPLAY_CAPACITY) {
            this.replay.shift()
        }
    }

    _updateActionValueFunction() {
        const index = Math.floor(Util.random(this.replay.length))
        let randomMinibatach = this.replay[index]
        let target
        
        log(this._actionValueFunction(randomMinibatach[this.STATUS_INDEX]))
  
        let maxQ = Util.max(this._actionValueFunction(randomMinibatach[this.STATUS_INDEX]))
        target = randomMinibatach[this.REWARD_INDEX] + this.DISCOUNT_FACTOR * maxQ
    }
}
