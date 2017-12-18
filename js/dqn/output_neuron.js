"use strict"

class OutputNeuron extends Neuron {
	constructor(network) {
		super(network)
	}

	
	value() {
		super.value()
		return this.out
	}
}
