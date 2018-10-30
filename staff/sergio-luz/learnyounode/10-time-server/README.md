 ## TIME SERVER (Exercise 10 of 13)

 #### Write a TCP time server!

  Your server should listen to TCP connections on the port provided by the
  first argument to your program. For each connection you must write the
  current date & 24 hour time in the format:

     "YYYY-MM-DD hh:mm"

  followed by a newline character. Month, day, hour and minute must be
  zero-filled to 2 integers. For example:

     "2013-07-06 17:42"

  After sending the string, close the connection.

----
 #### My Code:

```javascript
var net = require('net')

const [, , port] = process.argv

function zeroFill (i) {
    return (i < 10 ? '0' : '') + i
}

function returnTime() {

    let time = ''

    var date = new Date()

    time +=  zeroFill(date.getFullYear())+'-'
    time +=  zeroFill(date.getMonth()+1)+'-'     
    time +=  zeroFill(date.getDate())+' '     
    time +=  zeroFill(date.getHours())+':'
    time +=  zeroFill(date.getMinutes())+'\n'

    return time
}


var server = net.createServer(function (socket) {
    socket.end(returnTime())

})

server.listen(port)
```


 #### Solution:

```javascript
var net = require('net')
 
function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}
 
function now () {
  var d = new Date()
  return d.getFullYear() + '-'
    + zeroFill(d.getMonth() + 1) + '-'
    + zeroFill(d.getDate()) + ' '
    + zeroFill(d.getHours()) + ':'
    + zeroFill(d.getMinutes())
}
 
var server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})
 
server.listen(Number(process.argv[2]))
```

 <!-- ## Description of my code: -->