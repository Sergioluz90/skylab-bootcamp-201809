const mymodule = require ('./mymodule')

const[,,dir,ext] = process.argv

mymodule(dir,ext,function(err,list){
    if (err) throw err

    list.forEach(res => {
        console.log(res)
    })
})






