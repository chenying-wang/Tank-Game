const log = console.log.bind(console)

class TankGame {
    constructor(id) {
        this._init(id)
    }

    static new(...args) {
        return new this(...args)
    }

    _init(id) {
        this.id = id
        const canvas = document.querySelector('#' + id)
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d')
            this.ctx = ctx
            log(ctx)
        }
    }

}

const main = () => {
    mTankGame = TankGame.new('game')
}

window.onload = () => {
    main()
}
