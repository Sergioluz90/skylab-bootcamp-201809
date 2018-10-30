const http = require('http')
// var bl = require('bl')

const[,,url] = process.argv
let num = 0
let str = ''

http.get(url,function(res){
    
    res.on('data', function(data){
        // data.setEncoding('utf8')
        num += data.toString().length
        str += data.toString()
        
    })

    res.on('end', ()=>{
        console.log(num)
        console.log(str)
    })

    // res.pipe(bl(function(err,data){
    //     if(err) throw err
        
    //     console.log(num)
    //     console.log(str)
    // }))

    
})
