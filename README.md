
This package has been **deprecated** in favor of [node-red-contrib-openfaas](https://www.npmjs.com/package/node-red-contrib-openfaas)

# Node Red OpenFaaS

Call your OpenFaaS function from Node RED

## Install

- Setup OpenFaas as described on https://www.openfaas.com
- add the node to your node-red installation, for example using  `node-red-admin` CLI

  `node-red-admin install node-red-contrib-openfaas`

## Usage

Add the `openfaas` node and set your function name as in OpenFaas

## Example: Markdown live viewer

This example will watch a file on your disk and render it with the `func_markdown` to a webpage at `http://127.0.0.1:1880/markdown`

### Example

![editor](https://github.com/muka/node-red-openfaas/blob/master/img/editor.png?raw=true)
 ![result](https://github.com/muka/node-red-openfaas/blob/master/img/result.png?raw=true)

### Usage

- Change the `Watch README.md` filepath to a `*.md` file you want to edit and hit `Deploy`
- Go to `http://127.0.0.1:1880/markdown`
- Open the file you specified at first step and start editing, the webpage will show you the rendered output as you save

### Flow source

Use the import tool in node-red to use the flow

`[{"id":"c5875ece.dcc13","type":"openfaas","z":"825d97d4.f5a6b","name":"func_markdown","x":540,"y":240,"wires":[["7f9d2e99.7d416"]]},{"id":"d19c27de.ad9ee8","type":"http in","z":"825d97d4.f5a6b","name":"","url":"/markdown","method":"get","upload":false,"swaggerDoc":"","x":300,"y":60,"wires":[["581c020d.c68bac"]]},{"id":"3fd9cf17.fc844","type":"http response","z":"825d97d4.f5a6b","name":"","x":630,"y":60,"wires":[]},{"id":"9a0d4cd0.99fb7","type":"file in","z":"825d97d4.f5a6b","name":"Read file","filename":"","format":"utf8","chunk":false,"sendError":false,"x":400,"y":180,"wires":[["c5875ece.dcc13"]]},{"id":"8a8e7c4a.bb2ee","type":"watch","z":"825d97d4.f5a6b","name":"Watch README.md","files":"./node_modules/node-red-contrib-openfaas/README.md","recursive":"","x":130,"y":180,"wires":[["5c35876e.e82de8"]]},{"id":"7f9d2e99.7d416","type":"websocket out","z":"825d97d4.f5a6b","name":"","server":"a20f695c.ac4078","client":"","x":740,"y":180,"wires":[]},{"id":"581c020d.c68bac","type":"template","z":"825d97d4.f5a6b","name":"web page","field":"payload","fieldType":"msg","format":"html","syntax":"plain","template":"<html>\n    <head>\n        <title>Markdown live viewer</title>\n        <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css\" />\n    </head>\n    <body class=\"markdown-body\">\n        <div id=\"markdown\">\n            <h1>Waiting for updates</h1>\n            <p>Start editing your file to see the changes</p>\n        </div>\n        <div><pre id=\"updated\"></pre></div>\n        \n        <script>\n          var ws = new WebSocket(\"ws://127.0.0.1:1880/watchfile\");\n        \n          ws.onmessage = function(event) {\n              \n              var markdown = document.getElementById(\"markdown\");\n              var updated = document.getElementById(\"updated\");\n              \n              var html = event.data;\n              var updatedstr = \"Last update: \" + new Date().toLocaleTimeString();\n              \n              markdown.innerHTML = html\n              updated.innerHTML = updatedstr\n              \n          };\n          \n        </script>\n    </body>\n</html>","output":"str","x":480,"y":60,"wires":[["3fd9cf17.fc844"]]},{"id":"5c35876e.e82de8","type":"function","z":"825d97d4.f5a6b","name":"get filename","func":"\nmsg.filename = msg.payload\n\nreturn msg;","outputs":1,"noerr":0,"x":270,"y":240,"wires":[["9a0d4cd0.99fb7"]]},{"id":"a20f695c.ac4078","type":"websocket-listener","z":"","path":"/watchfile","wholemsg":"false"}]`

## TODO

- Add URL and authentication as a config node
- Use [node-openfaas](https://github.com/openfaas-incubator/node-openfaas)
- Add a write & fire node to directly spawn function from nodered (implies build & deploy from CLI)

## License

See `LICENSE` file
