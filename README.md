# Node Red OpenFaaS

Call your OpenFaaS function from Node RED

## Install

- Setup OpenFaas as described on https://www.openfaas.com
- add the node to your node-red installation, for example using  `node-red-admin` CLI

  `node-red-admin install node-red-openfaas`

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

```
[{"id":"8a8e7c4a.bb2ee","type":"watch","z":"825d97d4.f5a6b","name":"Watch README.md","files":"./node_modules/node-red-openfaas/README.md","recursive":"","x":130,"y":180,"wires":[["5c35876e.e82de8"]]}]
```

## TODO

- Add URL and authentication as a config node
- Use [node-openfaas](https://github.com/openfaas-incubator/node-openfaas)
- Add a write & fire node to directly spawn function from nodered (implies build & deploy from CLI)

## License

See `LICENSE` file
