var fs = require('fs')

let buffer = fs.readFileSync(process.argv[2])

buffer =buffer.toString()

buffer=buffer.split('\n')


console.log (buffer.length-1)