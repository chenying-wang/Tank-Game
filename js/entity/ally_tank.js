"use strict"

class AllyTank extends Tank {
	constructor(tankGame, position, id = null) {
		super(tankGame, position, id)

		for(let pattern of this.patterns) {
			if(pattern instanceof TankPattern) {
				pattern.color = Config.ALLY_COLOR
				break
			}
		}
	}
}
