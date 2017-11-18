
const rp = require('request-promise')

const functionInvoke = ({uri, name, payload, json}) => {
    return rp({
        uri: uri + '/function/' + name,
        method: 'POST',
        body: payload,
        json: json
    }).then((response) => Promise.resolve(tryParse(response)))
}

const functionList = ({uri}) => {
    return rp({
        uri: uri + '/system/functions',
        method: 'GET',
        json: true
    })
}

const functionExists = ({uri, name}) => {
    return functionList({uri}).then((functions) => Promise.resolve(functions.filter((f) => f.name === name).length > 0))
}

const tryParse = (json) => {
    try {
        return JSON.parse(json)
    } catch(e) {
        return json
    }
}

module.exports = function(RED) {

    function OpenFaaS(config) {

        RED.nodes.createNode(this, config)

        const uri = 'http://127.0.0.1:8080'
        const node = this

        node.on('input', function(msg) {
            const payload = tryParse(msg.payload)
            const json = payload !== msg.payload
            const name = node.name
            functionExists({name, uri}).then((exists) => {
                if(exists) {
                    return functionInvoke({uri, name, payload, json})
                        .then((payload) => {
                            msg.payload = payload
                            node.send(msg)
                        })
                }
            }).catch((e) => node.error(e.message))
        })
    }

    RED.nodes.registerType('openfaas', OpenFaaS)
}
