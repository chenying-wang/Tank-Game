"use strict"

window.onload = () => {
    // Main.main()
    Main.debug()
}

let log

class Main {
    static main() {
        Main.log = Config.DEBUG_LOG
        Main._toggleLog(false) 
        Main._setDescription()
        document.getElementById('control-mode').onclick = () => {
            Main._toggleControlMode()
        }
        document.getElementById('description').onclick = () => {
            Main._toggleDescription()
        }
        document.getElementById('log').onclick = () => {
            Main._toggleLog(true)
        }
    
        Main._initActionController()

        Main.episode = 0
        Main._initAgents()
        const canvas = document.getElementById(Config.CANVAS_ID)
        Main.updateTankGame(canvas)
    }

    static _setDescription() {
        const div = document.getElementById('description-content')
        if (div === null) return
        for (let action in KeyActions) {
            let description = "[" + action + "]" + " : " + KeyActions[action].description
            div.innerHTML += "<p>" + description + "</p>"
        }
    }

    static _initActionController() {
        Main.mActionController = ActionController.new()
        if(this.player != undefined) {
            Main.controlMode = Config.DEFAULT_CONTROL_MODE
        } else {
            Main.controlMode = 'test'
        }
        Main._toggleControlMode('KEEP')
    }

    static _initAgents() {
        Main.agentId = Config.AGENT_ID
        Main.agentType = Config.AGENT_TYPE
        Main.agents = []
        let agent
        for (let i = 0; i < Config.AGENT_ID.length; i++) {
            if(Main.agentType[i] === 'agent') {
                agent = TankAgent.new()
            } else if(Main.agentType[i] === 'simple') {
                agent = SimpleAiTankAgent.new()
            } else if(Main.agentType[i] === 'dqn') {
                agent = DqnAiTankAgent.new()
            } else {
                agent = AiTankAgent.new()
            }
            if (Main.agentId[i] === Config.PLAYER_ID) {
                Main.player = agent
            }
            Main.agents.push(agent)
        }
    }

    static _setAgents() {
        for (let i = 0; i < Config.AGENT_ID.length; i++) {
            Main.agents[i].die = false
            Main.mTankGame.setAgent(i, Main.agents[i])
        }
    }

    static updateTankGame(canvas) {
        log('Episode ' + Main.episode)
        Main.mTankGame = TankGame.new(Main.episode, canvas,
            Vector.new(Config.GRID_X, Config.GRID_Y), Main.agentId)
        Main.mActionController.game = Main.mTankGame
        Main._setAgents()
        if(Main.player) {
            Main.mTankGame.setPlayer(Main.player)
        }
        Main.mTankGame.start()
        Main.episode++
    }

    static _toggleControlMode(controlMode) {
        if (controlMode != 'KEEP') {
            Main.mActionController.removeActions(Main.controlMode)
            if (Main.controlMode === 'test') {
                Main.controlMode = 'mouse'
            } else if(Main.controlMode === 'mouse') {
                Main.controlMode = 'keyboard'
            } else {
                Main.controlMode = 'test'
            }
        }
        Main.mActionController.addActions(Main.controlMode)
        document.getElementById('control-mode').value = 'Control by ' + Main.controlMode
    }

    static _toggleDescription() {
        const div = document.getElementById('description-content')
        if (div.style.visibility === 'visible') {
            div.style.visibility = 'hidden'
        } else if (div.style.visibility === 'hidden') {
            div.style.visibility = 'visible'
        } else {
            div.style.visibility = 'hidden'
        }
    }

    static _toggleLog(change) {
        if(change) {
            Main.log = !Main.log
        }
        if(Main.log) {
            log = console.log.bind(console)
        } else {
            log = () => {}
        }
        document.getElementById('log').value = 'Log: ' + Main.log
    }

    static send(url, content) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', url, true)
            xhr.setRequestHeader("Content-type", "application/json")
            xhr.send(content)
            xhr.onload = () => {
                if(xhr.status === 200) {
                    let response
                    try {
                        response = xhr.response
                    } catch (e) {
                        reject(e)
                    }
                    resolve(response)
                } else {
                    reject('ERROR')
                }
            }
        })
    }

    static dumpAgent() {
        let factors = {}
        for(let agent of Main.agents) {
            factors.name = agent.id + '.json'
            factors = agent.dump()
            Main.send('php/save.php', JSON.stringify(factors))
        }
    }

    static async loadAgent() {
        let factors = {}
        for(let agent of Main.agents) {
            factors.name = agent.id + '.json'
            factors = await Main.send('php/load.php', JSON.stringify(factors))
            agent.load(factors)
        }
    }

    static async debug() {
        Main.log = Config.DEBUG_LOG
        Main._toggleLog(false)

        const nn = NeuralNetwork.new(3, 3, 1)
        const input = [[1, 1, 1]]
        const actualOutput = [0.8]
        log('DEBUG')
        let out, loss
        for(let i = 0; i < 5000; i++) {
            nn.input(input[0])
            out = nn.output()
            loss = actualOutput[0] - out
            nn.updateWeight(input[0], 0, loss)
        }
        const nnDump = NeuralNetwork.new()
        const factors = nn.dump()
        nnDump.load(factors)
        nnDump.input(input[0])
        log('nn', nn.output())
        log('nnDump', nnDump.output())
        log('factors', factors)
        factors.name = 'test.json'
        await Main.send('php/save.php', JSON.stringify(factors))
        let result = await Main.send('php/load.php', JSON.stringify({'name': 'test.json'}))
        log('result', JSON.parse(result))  
    }
}
