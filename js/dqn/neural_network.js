"use strict"

class NeuralNetwork {
    constructor(...args) {
        this.layers = [...args]
        this._init()
    }

    static new(...args) {
        return new this(...args)
    }

    _init() {
        this.inputLayer = []
        this.hiddenLayer = []
        this.outputLayer = []
        for(let i = 0; i < this.layers.length; i++) {
            for(let j = 0; j < this.layers[i]; j++) {
                let neuron
                if(i === 0) {
                    neuron = Neuron.new(this, 'input')
                    this.inputLayer.push(neuron)
                } else if(i === this.layers.length - 1) {
                    neuron = Neuron.new(this, 'output')
                    this.outputLayer.push(neuron)
                } else {
                    if(j === 0) this.hiddenLayer.push([])
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

    updateWeight(input, ouputIndex, loss) {
        this.input(input)
        this.output()
        this.outputLayer[ouputIndex].update(loss)
    }

    dump() {
        let factors = {}
        factors.layers = this.layers
        factors.weight = []
        for(let i = 0; i < this.layers.length - 1; i++) {
            factors.weight.push([])
            for(let j = 0; j < this.layers[i + 1]; j++) {
                if(i === this.layers.length - 2) {
                    factors.weight[i].push(this.outputLayer[j].weight)
                } else {
                    factors.weight[i].push(this.hiddenLayer[i][j].weight)
                }
            }
        }
        return factors
    }

    load(factors) {
        this.layers = factors.layers
        this._init()

        for(let i = 0; i < this.layers.length - 1; i++) {
            for(let j = 0; j < this.layers[i + 1]; j++) {
                if(i === this.layers.length - 2) {
                    this.outputLayer[j].weight = factors.weight[i][j]
                } else {
                    this.hiddenLayer[i][j].weight = factors.weight[i][j]
                }
            }
        }
    }
}
