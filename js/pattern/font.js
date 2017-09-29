"use strict"

class Font extends Pattern {
    constructor(parent) {
        super(parent)

        this.text = ''
    }

    _drawPattern() {
        this.game.drawFont(this.position, this.text)
    }
}
