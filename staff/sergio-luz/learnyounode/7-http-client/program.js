const http = require('http')

const[,,url] = process.argv

http.get(url,function(res){
    
    res.on('data', function(data){
        console.log(data.toString())
    })
    
})