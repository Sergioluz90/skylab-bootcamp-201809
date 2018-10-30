
 # HTTP FILE SERVER (Exercise 11 of 13)

  Write an HTTP server that serves the same text file for each request it
  receives.

  Your server should listen on the port provided by the first argument to
  your program.

  You will be provided with the location of the file to serve as the second
  command-line argument. You must use the fs.createReadStream() method to
  stream the file contents to the response.

----
 #### My Code:

```javascript
const http = require('http')
const fs = require('fs')

const { argv : [, , port, filePath] } = process

const server = http.createServer(function (request, res) {

  fs.createReadStream(filePath).pipe(res)
})

server.listen(Number(port))
```


 #### Solution:

```javascript
var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))
```

 <!-- ## Description of my code: -->

* importamos el modulo http
* importamos el modulo fs
* guardamos el puerto y al path del archivo recibidos mediante destructuring
* creamos una variable server que contendrá la creacion de un servidor
  * con server.listen el servidor se pondrá a escuchar en el puerto que le indiquemos
  * cuando llegue una peticion (sin distinguir su metodo):
    * mediante el modulo fs se leera el fichero que se encuentre en la ruta indicada y se devolverá su contenido como respuesta.
      * la devolucion la hace el pipe()

      
# Diferencias de la solucion

```javascript
  res.writeHead(200, { 'content-type': 'text/plain' })
```

* es importante para enviar un header indicandole al cliente que tipo de respuesta le enviamos (texto, json, etc)