 # HTTP UPPERCASERER (Exercise 12 of 13)

  Write an HTTP server that receives only POST requests and converts
  incoming POST body characters to upper-case and returns it to the client.

  Your server should listen on the port provided by the first argument to
  your program.

----
 #### My Code:

```javascript
const http = require('http')
const map = require('through2-map')

const [, , port] = process.argv

const server = http.createServer(function (request, res) {
    if (request.method !== 'POST')
        return res.end('send me a POST\n')

    request.pipe(map(chunk => { 
        return chunk.toString().toUpperCase()
    })).pipe(res)
})

server.listen(Number(port))
```


 #### Solution:

```javascript
var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n')
  }

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))
```

 <!-- ## Description of my code: -->