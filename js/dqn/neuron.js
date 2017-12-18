"use strict"

class Neuron {
    constructor(network) {
        this.LEARNING_RATE = 0.001

        this.network = network

        this.in = []
        this.out = 0
        this.weight = []
        this.bias = 0
    }

    static new(...args) {
        return new this(...args)
    }

    connect(neuronArray) {
        for (let arg of neuronArray) {
            if(arg instanceof Neuron) {
                this.in.push(arg)
                this.weight.push(Util.random(1, -1))
                // this.weight.push(1)
            }
        }
    }

    value() {
        this.out = this.bias
        for(let i = 0; i < this.in.length; i++) {
            this.out += this.in[i].out * this.weight[i]
        }
        this.out = this._activation(this.out)
    }

    update(loss, lossNext) {
        if(loss === 0) return
        let correct = []
        for(let i = 0; i < this.in.length; i++) {
            lossNext[i] += this.weight[i] * loss
            this.weight[i] += this.LEARNING_RATE * loss * (this.out > 0 ? 1 : 0.01) * this.in[i].out
            this.bias += this.LEARNING_RATE * loss * (this.out > 0 ? 1 : 0.01)
            // if(this.bias > 1 || this.bias < -1) log(this.bias)
        }
    }

    
    _activation(x) {
        // sigmoid
        // let y
        // y = 1 / (1 + Math.E ** (-x))
        // return y

        // relu
        return Util.max([0.01 * x, x])
    }
}
