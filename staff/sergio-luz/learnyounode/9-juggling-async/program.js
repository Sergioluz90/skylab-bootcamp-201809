const http = require('http')
var bl = require('bl')

const {aegv: [,,...url]} = process

let str = []
let count = 0

url.forEach((url,index)=>{

    
    http.get(url,function(res){
       
        res.pipe(bl(function(err,data){
            if(err) throw err
            str[index] = data.toString()

            count ++
            if (count===url.length) str.forEach(str => console.log(str))

        }))

    })
    
})
