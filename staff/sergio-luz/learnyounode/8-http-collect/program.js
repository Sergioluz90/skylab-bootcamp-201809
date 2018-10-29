const http = require('http')
var bl = require('bl')

const[,,url] = process.argv
let num = 0
let str = ''

http.get(url,function(res){
    
    res.on('data', function(data){
        num += data.toString().length
        str += data.toString()
        
    })
    res.pipe(bl(function(err,data){
        if(err) throw err
        
        console.log(num)
        console.log(str)
    }))

    
})

// var http = require('http')
//     var bl = require('bl')

//     http.get(process.argv[2], function (response) {
//       response.pipe(bl(function (err, data) {
//         if (err) {
//           return console.error(err)
//         }
//         data = data.toString()
//         console.log(data.length)
//         console.log(data)
//       }))
//     })
