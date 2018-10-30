const http = require('http')
const map = require('through2-map')

const [, , port] = process.argv

const server = http.createServer(function (request, res) {
    if (request.method !== 'POST')
        return res.end('send me a POST\n')

    request.pipe(map(chunk => { 
        //chunk.setEncoding('utf8')
        return chunk.toString().toUpperCase()
    })).pipe(res)
})

server.listen(Number(port))