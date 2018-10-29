var net = require('net')

// var socket = require('net').Socket()

const [, , port] = process.argv

function zeroFill (i) {
    return (i < 10 ? '0' : '') + i
  }

function returnTime() {

    let time = ''

    var date = new Date()

    time +=  zeroFill(date.getFullYear())+'-'
    time +=  zeroFill(date.getMonth()+1)+'-'     // starts at 0
    time +=  zeroFill(date.getDate())+' '      // returns the day of month
    time +=  zeroFill(date.getHours())+':'
    time +=  zeroFill(date.getMinutes())+'\n'

    return time
}


var server = net.createServer(function (socket) {

   
    socket.end(returnTime())
    // socket.on('data',function(data){
    //     // console.log(data.toString())
    //     // socket.write(data)
    // })

})

server.listen(port)


