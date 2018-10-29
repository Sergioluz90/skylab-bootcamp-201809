var fs = require('fs')

function callback(err, contents) {
    if (err) throw err

    var lines = contents.toString().split('\n').length - 1
    console.log(lines)
}

fs.readFile(process.argv[2], 'utf8', callback)


