 # HTTP JSON API SERVER (Exercise 13 of 13)

  Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program.


----
 #### My Code:

```javascript
const http = require('http')
const map = require('through2-map')
let url = require('url')

const [, , port] = process.argv

const server = http.createServer(function (request, res) {

    if (request.method === 'GET')
        res.writeHead(200, { 'Content-Type': 'application/json' })
    url = url.parse(request.url, true)

    if (url.pathname === '/api/parsetime') {
        res.end(JSON.stringify( getParseTime(url)))

    } else if (url.pathname === '/api/unixtime') {
        res.end(JSON.stringify( getUnixTime(url)))

    } else {
        res.end('no valid url')

    }

    request.pipe(map(chunk => {
        return chunk.toString().toUpperCase()
    })).pipe(res)
})

server.listen(Number(port))

const getParseTime = function (url) {
    const date = new Date(url.query.iso)

    return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
}

function getUnixTime(url) {
    const date = new Date(url.query.iso)

    return { unixtime: date.getTime() }
}
```


 #### Solution:

```javascript
var http = require('http')
var url = require('url')

function parsetime (time) {
    return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
    }
}

function unixtime (time) {
    return { unixtime: time.getTime() }
}

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result

    if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time)
    } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time)
    }

    if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
    } else {
    res.writeHead(404)
    res.end()
    }
})
server.listen(Number(process.argv[2]))
```

 <!-- ## Description of my code: -->