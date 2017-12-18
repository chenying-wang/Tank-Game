"use strict"

class InputNeuron extends Neuron {
	constructor(network) {
		super(network)
	
		this.in = 0
		this.weight = 1
		this.bias = 0
	}

	value() {
		this.out = this.in
	}
	
	update(loss) {
		return
	}
} 
