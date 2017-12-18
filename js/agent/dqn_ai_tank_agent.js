"use strict"

class DqnAiTankAgent extends AiTankAgent {
    constructor() {
        super()

        this.EXPLORERATION = 0.05
        this.DISCOUNT_FACTOR = 0.8
        this.ACTION_REPEAT = 50
        this.TARGET_UPDATE_FREQUENCY = 100

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

        this.qNetwork  = NeuralNetwork.new(this.STATUS_NUMBERS, 12, 24, 12, this.ACTION_NUMBERS)
        this.targetQNetwork = NeuralNetwork.new(this.STATUS_NUMBERS, 12, 24, 12, this.ACTION_NUMBERS)
    }

    init() {
        super.init()

        this.lastStatus = this.status
    }

    _actionValueFunction(status, network = this.qNetwork) {
        this.qNetwork.input(status)
        return network.output()
    }

    loop() {
        if(this.die) return
        this.frameIndex++
        // if(this.tank.id === 'bot0') log(this.frameIndex)
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

                if(this.tank.id === 'bot0') log('out', this.tank.id, out)
                let max = out[0]
                let action = 0
                for(let i = 1; i < out.length; i++) {
                    if(out[i] > max) {
                        max = out[i]
                        action = i
                    }
                }
                this.action = action
            }
            // if(this.tank.id === 'bot0') log('action', this.tank.id, this.action)
        }
        this.move(this.action * this.DIFF_ANGLE)
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
        if(this.frameIndex % this.ACTION_REPEAT !== 0) return
        const index = Math.floor(Util.random(this.replay.length))
        let randomMinibatach = this.replay[index]
        let maxNextQ, target, currentQ, loss, lossArray

        maxNextQ = Util.max(
            this._actionValueFunction(randomMinibatach[this.NEXT_STATUS_INDEX], this.targetQNetwork))
        // r + gamma * max(Q(s+1, a))
        target = randomMinibatach[this.REWARD_INDEX] + this.DISCOUNT_FACTOR * maxNextQ
        currentQ = this._actionValueFunction(randomMinibatach[this.STATUS_INDEX])[randomMinibatach[this.ACTION_INDEX]]

        loss = target - currentQ
        if(this.tank.id === 'bot0') log('loss', loss)

        lossArray = Array(36).fill(0)
        lossArray[randomMinibatach[this.ACTION_INDEX]] = loss
        this._actionValueFunction(randomMinibatach[this.STATUS_INDEX])
        this.qNetwork.updateWeight(lossArray)

        if(this.frameIndex % this.TARGET_UPDATE_FREQUENCY === 0) {
            this.targetQNetwork.clone(this.qNetwork)
            this.frameIndex = 0
        }
    }

    dump() {
        return this.qNetwork.dump()
    }

    load(factors) {
        this.qNetwork.load(factors)
        this.targetQNetwork.clone(this.qNetwork)
    }
}
