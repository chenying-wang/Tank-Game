"use strict"

class Neuron {
    constructor(network, type) {
        this.network = network
        this.type = type

        this.value = 0
        if(this.type == 'input') {
            this.input = this._input
        } else if(this.type == 'output') {
            this.output = this._output
        }
    }

    static new(...args) {
        return new this(...args)
    }

    _input(value) {
        this.value = value
    }

    _output() {
        this.value
     }
}