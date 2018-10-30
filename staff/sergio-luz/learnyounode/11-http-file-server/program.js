const http = require('http')
const fs = require('fs')

const { argv : [, , port, filePath] } = process

const server = http.createServer(function (request, res) {

  fs.createReadStream(filePath).pipe(res)
})

server.listen(Number(port))