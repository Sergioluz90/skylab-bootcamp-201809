const http = require('http')
var bl = require('bl')

const[,,url1,url2,url3] = process.argv
const url = [url1,url2,url3]


let str = []
let count = 0

url.forEach((url,index)=>{

    
    http.get(url,function(res){
       
        res.pipe(bl(function(err,data){
            if(err) throw err
            str[index] = data.toString()

            count ++
            if (count===3) str.forEach(str => console.log(str))

        }))

    })
    
})
