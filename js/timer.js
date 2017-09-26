class Timer {
    constructor(run, interval) {
        this.pause = true
        this.lock = true
        this.run = run
        this.interval = interval
        this._run()
    }

    static new(...args) {
        return new this(...args)
    }

    start() {
        this.pause = false
        this._run()
    }

    stop() {
        this.pause = true
    }

    _run() {
        if (this.pause == false) {
            this.run()
            window.setTimeout(() => {
                this._run()
            }, this.interval)
        }
    }
}
