var fs = require('fs')
var path = require('path')

module.exports = function (d_name, extension, callback) { 
    
    fs.readdir(d_name, function (err, list) {
      if (err)
        return callback(err)
   
      list = list.filter(function (file) {
        return path.extname(file) === '.' + extension
      })
   
      callback(null, list)
    })

 }

