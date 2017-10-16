"use strict"

window.onload = () => {
    Main.main()
    // Main.debug()
}

let log

class Main {
    static async main() {
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

        Main._initAgents()
        Main.load = false
        await Main._loadAgents()
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
        for (let i = 0; i < Main.agentId.length; i++) {
            if(Main.agentType[i] === 'agent') {
                agent = TankAgent.new()
            } else if(Main.agentType[i] === 'simple') {
                agent = SimpleAiTankAgent.new()
            } else if(Main.agentType[i] === 'dqn') {
                agent = DqnAiTankAgent.new()
            } else {
                agent = AiTankAgent.new()
            }
            agent.id = Main.agentId[i]
            if (agent.id === Config.PLAYER_ID) {
                Main.player = agent
            }
            Main.agents.push(agent)
        }
    }

    static async updateTankGame(canvas) {
        if(Main.load === false) {
            await Main._dumpAgents()
        }

        Main.load = false
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

    static _setAgents() {
        for (let i = 0; i < Main.agentId.length; i++) {
            Main.agents[i].die = false
            Main.mTankGame.setAgent(i, Main.agents[i])
        }
    }

    static async _dumpAgents() {
        return new Promise(async (resolve, reject) => {
            if(Main.episode % Config.DUMP_FREQUENCY !== 0) {
                log('no')
                resolve()
            }

            let manifest = {}
            manifest.name = 'result/manifest.json'
            manifest.episode = Main.episode
            manifest.time = Date.now()
            await Main._send('php/save.php', JSON.stringify(manifest))
            
            let factors
            for(let agent of Main.agents) {
                factors = agent.dump()
                log('dump', agent.id, factors)
                factors.name = 'result/' + manifest.time + '/' + agent.id + '.json'
                await Main._send('php/save.php', JSON.stringify(factors))
            }
            resolve()
        })
    }

    static async _loadAgents() {
        return new Promise(async (resolve, reject) => {
            let manifest = {'name': 'result/manifest.json'}
            manifest = await Main._send('php/load.php', JSON.stringify(manifest))
            manifest = JSON.parse(manifest)
            log('manifest', manifest)
            if(manifest){
                Main.load = true
                Main.episode = manifest.episode
                Main.time = manifest.time
            } else {
                Main.episode = 0
                Main.time = 0
                resolve()
            }
            
            let factors
            for(let agent of Main.agents) {
                factors = {'name': 'result/'+ Main.time + '/' + agent.id + '.json'}
                factors = await Main._send('php/load.php', JSON.stringify(factors))
                factors = JSON.parse(factors)
                log('load', agent.id, factors)
                if(factors) {
                    agent.load(factors)
                }
            }
            resolve()
        })
    }

    static _send(url, content = {}) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', url, true)
            xhr.setRequestHeader("Content-type", "application/json")
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
            xhr.send(content)
        })
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
        await Main._send('php/save.php', JSON.stringify(factors))
        let result = await Main._send('php/load.php', JSON.stringify({'name': 'test.json'}))
        log('result', JSON.parse(result))  
    }
}
