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

    init() {
        super.init()

        this.lastStatus = this.status
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
        let maxNextQ, target, currentQ, loss = []

        maxNextQ = Util.max(this._actionValueFunction(randomMinibatach[this.NEXT_STATUS_INDEX]))
        // r + gamma * max(Q(s+1, a))
        target = randomMinibatach[this.REWARD_INDEX] + this.DISCOUNT_FACTOR * maxNextQ

        currentQ = this._actionValueFunction(randomMinibatach[this.STATUS_INDEX])
        for(let value of currentQ) {
            loss.push((target - value) ** 2)
        }
        this.qNetwork.updateWeight(loss)
    }
}
