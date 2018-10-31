// var fs = require('fs')

// function callback(err, list){
    
//     list.forEach(res=> {

//         if(res.toString().endsWith('.md')) 
//             {
//                 console.log(res)
//             }
//         })
// }

// fs.readdir(process.argv[2], 'utf8',callback)

const fs = require('fs')
const path = require('path')

const[,,dir,ext] = process.argv

fs.readdir(dir, (err,files) => {
    if (err) throw err
    files.forEach(file=> {
        if(path.extname(file) === `.${ext}`) console.log(file)
    })
})


