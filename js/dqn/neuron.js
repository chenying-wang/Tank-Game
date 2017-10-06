"use strict"

class Neuron {
    constructor(network, type) {
        this.LEARNING_RATE = 0.1

        this.network = network
        this.type = type

        this.weight = []
        this.bias = 0
        this.in = []
        this.out = 0
    }

    static new(...args) {
        return new this(...args)
    }

    connect(neuronArray) {
        for (let arg of neuronArray) {
            if(arg instanceof Neuron) {
                this.in.push(arg)
                this.weight.push(Util.random(0.1, -0.1))
            }
        }
    }

    value() {
        this.out = this.bias
        if(this.type == 'input') {
            this.out += this.in * this.weight
            this.activativeOut = this.out
            return this.activativeOut
        }
        for(let i = 0; i < this.in.length; i++) {
            this.out += this.in[i].value() * this.weight[i]
        }
        this.activativeOut = this._activation(this.out)
        return this.activativeOut
    }

    update(loss) {
        if(this.type == 'input') return
        let correct = []
        for(let i = 0; i < this.in.length; i++) {
            correct.push(this.LEARNING_RATE * loss  * this.out * this.in[i].activativeOut)
            this.in[i].update(this.weight[i] * loss)
        }
        for(let i = 0; i < this.in.length; i++) {
            this.weight[i] += correct[i]
        }
    }

    _activation(x) {
        let y
        y = 1 / (1 + Math.E ** (-x))
        return y
    }

    _activationDerivative(x) {
        let y
        y = this._activation(x) * this._activation(1 - x)
        return y
    }
}
