const fs = require('fs')

const [,,file]

let buffer = fs.readFileSync(file)

buffer =buffer.toString()

buffer=buffer.split('\n')


console.log (buffer.length-1)