"use strict"

class RewardIndicator extends Pattern {
    constructor(parent, offset = Vector.new(0, 0), anchor = parent) {
        super(parent, offset, anchor)

        this.mode = 'tree'

        this.font = Font.new(this)
        this.font.color = 'rgb(255, 255, 0)'

        this.patterns.push(this.font)
    }

    _drawPattern() {
        super._drawPattern()

        this.font.text = this.parent.agent.reward
    }
}
