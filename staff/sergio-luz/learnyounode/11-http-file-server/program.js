const http = require('http')
const fs = require('fs')

const [, , port, filePath] = process.argv

const server = http.createServer(function (request, res) {

  fs.createReadStream(filePath).pipe(res)
})

server.listen(Number(port))