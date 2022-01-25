# Simple Artillery and log4js example

My first approach to [cluster.fork()](https://nodejs.org/dist/latest-v17.x/docs/api/cluster.html) and [PM2]().

## To run

Install all dependencies

```bash
npm install
npm i artillery -g
```
Then you have two scripts predefined (e.g: "npm run block") to help you get the exercise results:
```bash
block:        node index.js --block
```
```bash
noblock:      node index.js
```
Each of the above need to be run before the corresponding:

```bash
artillery quick --count 50 - n 20 "http://http://localhost:8080/info" > NONblocking.txt
```
```bash
artillery quick --count 50 - n 20 "http://http://localhost:8080/info" > blocking.txt
```

## These are the routes

```bash
localhost:8080/api/randoms?cant=   (whatever number you like. If no number, defalult=100000))
```
The /info route has two ways of executing. One with regular console.log (blocking) and the other with [log4js](https://github.com/log4js-node/log4js-node) (non blocking) library.

```bash
localhost:8080/info
```

Results and comparisons are shown here:


## Enjoy this next saturday night
