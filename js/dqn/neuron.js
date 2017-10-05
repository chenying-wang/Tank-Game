"use strict"

class Neuron {
    constructor(network, type) {
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
                this.weight.push(1)
            }
        }
    }

    value() {
        this.out = this.bias
        if(this.type == 'input') {
            this.out += this.in * this.weight
            return this.out
        }
        for(let i = 0; i < this.in.length; i++) {
            this.out += this.in[i].value() * this.weight[i]
        }
        // this.out = this._activation(this.out)
        return this.out
    }

    _activation(x) {
        let y
        if(x > 0) y = x
        else y = 0
        return y
    }
}
