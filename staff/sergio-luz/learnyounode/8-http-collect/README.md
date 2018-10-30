 ## HTTP COLLECT (Exercise 8 of 13)

  Write a program that performs an HTTP GET request to a URL provided to you
  as the first command-line argument. Collect all data from the server (not
  just the first "data" event) and then write two lines to the console
  (stdout).

  The first line you write should just be an integer representing the number
  of characters received from the server. The second line should contain the
  complete String of characters sent by the server.

----
 #### My Code:

```javascript
const http = require('http')

const[,,url] = process.argv
let num = 0
let str = ''

http.get(url,function(res){
    
    res.on('data', function(data){
        num += data.toString().length
        str += data.toString()
        
    })

    res.on('end', ()=>{
        console.log(num)
        console.log(str)
    })
})
```


 #### Solution:

```javascript
var http = require('http')
var bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err) {
      return console.error(err)
    }
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})
```

 <!-- ## Description of my code: -->

* importamos el modulo http

* destructuramos los parametros recibidos a traves de process:
  * sabemos que el tercer argumento sera una url

* iniciamos una conexion cliente-servidor mediante la funcion http.get

  * cada vez que recibamos un paquete de datos (data) se ejecutara la funcion res.on('data):
    * Esta funcion es una funcion asincrona, por tanto es una función no bloqueante
    * Acumulara los datos en forma de string en str
    * Acumulara la longitud de los datos en num
    * Una forma más correcta de hacerlo sería cambiar el contenido de la funcion por:
      *  
      ```javascript
        data.setEncoding('utf8')
        num += data.length
        str += data
      ```
      * de esta manera solo transformamos data en un string una unica vez cada vez que recibamos datos

  * cuando termine la comunicación recibiremos un evento 'end' y se ejecutara la funcion res.on('end):
    * esta funcion mostrara por pantalla:
      * en la primera linea la longitud de los datos
      * en la segunda linea los datos en forma de texto

# diferencias de la solucion

* importa el modulo[ bufferList bl](https://www.npmjs.com/package/bl): este modulo sirve para acumular los datos recibidos

* en la funcion http.get utiliza un pipe() para conectar esta funcion con una de bl
  * dentro de la funcion bl crea una fucnion que se ejecutará cuando la totalidad de los datos hayan sido recibidos y acumulados
    * hacerlo asi le permite poder controlar errores y poder realizar una unica conversion a string de los datos, optimizando así el codigo