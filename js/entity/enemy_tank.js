"use strict"

class EnemyTank extends Tank {
	constructor(tankGame, position, id = null) {
		super(tankGame, position, id)
		
		for(let pattern of this.patterns) {
			if(pattern instanceof TankPattern) {
				pattern.color = Config.ENEMY_COLOR
				break
			}
		}
	}
}
