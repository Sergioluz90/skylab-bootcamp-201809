const fs = require('fs')

const [,, file]

function callback(err, contents) {
    if (err) throw err

    const lines = contents.toString().split('\n').length - 1
    console.log(lines)
}

fs.readFile(file, 'utf8', callback)


