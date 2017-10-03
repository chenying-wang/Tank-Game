"use strict"

class NeuralNetwork {
    constructor() {
        this.layers = [3, 3, 2]
        this.input = []
        this.output = []
        this.init()
    }

    static new(...args) {
        return new this(...args)
    }

    init() {
        let neuron
        for(let i = 0; i < this.layers.length; i++) {
            for(let j = 0; j < this.layers[i]; j++) {
                if(i == 0) {
                    neuron = Neuron.new(this, 'input')
                    this.input.push(neuron)
                } else if(i == this.layers.length - 1) {
                    neuron = Neuron.new(this, 'output')
                    this.output.push(neuron)
                } else {

                }
            }
        }
    }

    
}