"use strict"

class DqnAiTankAgent extends AiTankAgent {
    constructor() {
        super()

        this.EXPLORERATION = 0.05
        this.DISCOUNT_FACTOR = 0.99
        this.ACTION_REPEAT = 16
        this.TARGET_UPDATE_FREQUENCY = 10000

        this.REPLAY_CAPACITY = 10000
        this.STATUS_INDEX = 0
        this.ACTION_INDEX = 1
        this.REWARD_INDEX = 2
        this.NEXT_STATUS_INDEX = 3

        this.frameIndex = 0

        this.action = Entity.UP
        this.lastStatus = []
        this.lastReward = 0
        this.replay = []

        this.qNetwork  = NeuralNetwork.new(2, 72, 36)
        this.targetQNetwork = this.qNetwork
    }

    init() {
        super.init()

        this.lastStatus = this.status
    }

    _actionValueFunction(status, network = this.qNetwork) {
        this.qNetwork.input(status)
        return this.qNetwork.output()
    }

    loop() {
        this.frameIndex++
        // if(this.tank.id === 'bot0') log(this.frameIndex)

        if(this.die) return
        this._updateStatus()
        this._storeTransition()
        this._updateActionValueFunction()

        this.lastStatus = this.status
        this.lastReward = this.reward
        this._action()
        // log('reward', this.tank.id, this.reward)
    }

    _action() {
        if(this.frameIndex % this.ACTION_REPEAT === 0) {
            let dx, dy
            if(Util.random() < this.EXPLORERATION) {
                this.action = Math.floor(Util.random(36))
                // if(this.tank.id === 'bot0') log('out', 'random')
            } else {
                this.qNetwork.input(this.status)
                let out = this.qNetwork.output()

                // if(this.tank.id === 'bot0') log('out', this.tank.id, out)
                let max = out[0]
                let action = 0
                for (let i = 0; i < out.length; i++) {
                    if(max < out[i]) {
                        max = out[i]
                        action = i
                    }
                }
                this.action = action
            }
            // if(this.tank.id === 'bot0') log('action', this.tank.id, this.action)
        }
        this.move(this.action * 10)
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
        let maxNextQ, target, currentQ, loss

        maxNextQ = Util.max(this._actionValueFunction(randomMinibatach[this.NEXT_STATUS_INDEX], this.targetQNetwork))
        // r + gamma * max(Q(s+1, a))
        target = randomMinibatach[this.REWARD_INDEX] + this.DISCOUNT_FACTOR * maxNextQ
        currentQ = this._actionValueFunction(randomMinibatach[this.STATUS_INDEX])[randomMinibatach[this.ACTION_INDEX]]

        loss = target - currentQ
        this.qNetwork.updateWeight(randomMinibatach[this.STATUS_INDEX],
                randomMinibatach[this.ACTION_INDEX],
                loss)
        if(this.frameIndex % this.TARGET_UPDATE_FREQUENCY === 0) {
            this.targetQNetwork = this.qNetwork
            this.frameIndex = 0
        }
    }
}
