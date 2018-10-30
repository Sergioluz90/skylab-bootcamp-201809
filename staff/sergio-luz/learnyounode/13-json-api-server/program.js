const http = require('http')
const map = require('through2-map')
let url = require('url')

const [, , port] = process.argv

const server = http.createServer(function (request, res) {

    if (request.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        url = url.parse(request.url, true)

        if (url.pathname === '/api/parsetime') {
            res.end(JSON.stringify(getParseTime(url)))

        } else if (url.pathname === '/api/unixtime') {
            res.end(JSON.stringify(getUnixTime(url)))

        } else {
            res.end('no valid url')

        }

        request.pipe(map(chunk => {
            return chunk.toString().toUpperCase()
        })).pipe(res)
    }
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
