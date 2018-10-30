 # TIME SERVER (Exercise 10 of 13)

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

* En este ejercicio se trabaja mediante sockets y no http. Es decir, se trabaja por protocolo TCP, de bajo nivel. 

* importamos el modulo [net](https://nodejs.org/api/net.html)
* extraemos el puerto de los argumentos recibidos
* creamos una funcion returnTime() que nos devolera la hora acutal del sistema
* creamos una variable llamada server que contiene la funcion para crear una conexion cliente-servidor
* A continuación mediante server.listen abrimos la conexion indicandole el puerto 
* Dentro de server se ejecutara la sentencia socket.end()
  * un socket es una abstraccion en formato de objeto de la conexion establecida
  * esta sentencia ejecutará la funcion returnTime(), enviará la respuesta recibida y cerrará la conexion 
    
# Solucion alternativa mediante Strftime

```javascript

```
* first of all we need to install Strftime
  * We crreate a package.json: 
      >npm i --yes
  * We install Strftime: 
      >npm i strftime
* 