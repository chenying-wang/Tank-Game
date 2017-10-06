"use strict"

class NeuralNetwork {
    constructor() {
        this.layers = [2, 3, 36]
        this.inputLayer = []
        this.hiddenLayer = []
        this.outputLayer = []
        this.init()
    }

    static new(...args) {
        return new this(...args)
    }

    init() {
        for(let i = 0; i < this.layers.length; i++) {
            for(let j = 0; j < this.layers[i]; j++) {
                let neuron
                if(i == 0) {
                    neuron = Neuron.new(this, 'input')
                    this.inputLayer.push(neuron)
                } else if(i == this.layers.length - 1) {
                    neuron = Neuron.new(this, 'output')
                    this.outputLayer.push(neuron)
                } else {
                    if(j == 0) this.hiddenLayer.push([])
                    neuron = Neuron.new(this, 'hidden')
                    this.hiddenLayer[i - 1].push(neuron)
                }
            }
        }

        for(let neuron of this.inputLayer) {
            neuron.in = 0
            neuron.weight = 1
        }
        for(let i = 0; i < this.hiddenLayer.length; i++) {
            for(let neuron of this.hiddenLayer[i]) {
                if(i > 0) {
                    neuron.connect(this.hiddenLayer[i - 1])
                } else {
                    neuron.connect(this.inputLayer)
                }
            }
        }
        for(let neuron of this.outputLayer) {
            neuron.connect(this.hiddenLayer[this.hiddenLayer.length - 1])
        }
    }

    input(array) {
        let i = 0
        for(let neuron of this.inputLayer) {
            neuron.in = array[i++]
        }
    }

    output() {
        let out = []
        for(let neuron of this.outputLayer) {
            out.push(neuron.value())
        }
        return out
    }

    updateWeight(status, action, loss) {
        this.input(status)
        this.output()
        this.outputLayer[action].update(loss)
    }
}
