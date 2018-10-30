 # JUGGLING ASYNC (Exercise 9 of 13)

  This problem is the same as the previous problem (HTTP COLLECT) in that
  you need to use http.get(). However, this time you will be provided with
  three URLs as the first three command-line arguments.

  You must collect the complete content provided to you by each of the URLs
  and print it to the console (stdout). You don't need to print out the
  length, just the data as a String; one line per URL. The catch is that you
  must print them out in the same order as the URLs are provided to you as
  command-line arguments.

----
 #### My Code:

```javascript
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
```


 #### Solution:

```javascript
var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++) {
    console.log(results[i])
  }
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err)
      }

      results[index] = data.toString()
      count++

      if (count === 3) {
        printResults()
      }
    }))
  })
}

for (var i = 0; i < 3; i++) {
  httpGet(i)
}
```

 <!-- ## Description of my code: -->

 * para crear un package.json: npm init --yes

 * importamos el modulo http
 * importamos el modulo[ bufferList bl](https://www.npmjs.com/package/bl): este modulo sirve para acumular los datos recibidos
 * en la funcion http.get utiliza un pipe() para conectar esta funcion con una de bl
 * aplicamos destructuring para almacenar todas las url que recibamos como argumentos

 * declaramos las dos variables que utilizaremos:
  * una para almacenar los diferentes datos que recibamos
  * otra para contar cuantos paquetes completos de datos recibimos

* hacemos un forEach para ejecutar su contenido para cada url recibida
  * creamos una conexion http.get para cada url
    * cada respuesta la conectamos mediante un pipe() con un bl que acumulara todos los datos recibidos. Al finalizar la acumuluación ejecutará la función contenida en bl:
      * si ha habido error lo mostraremos por pantalla
      * en caso de que no lo haya habido convertimos los datos a string y los almacenamos, aumentamos el contador y comprobamos si se han completado todas las llamadas
        * en caso de que se hayan completado todas las llamadas mostramos los datos por pantalla en el orden de llamada mediante un forEach


# Solucion alternativa con After

```javascript
const http=require ('http')
const after=require('after')

const {aegv: [,,...url]} = process



```

* utilizamos el modulo [After](https://www.npmjs.com/package/after)
* la funcion after sirve para ejecutar un callback al finalizar el conteo de urls
  * dentro de dicho callback ejecutamos un console.log para mostrar por pantalla los resultados
* utilizar la funcion after nos ahorra declarar un contador e ir aumentandolo de manera imperativa


# Solucion alternativa con Async

```javascript
const http=require ('http')
const async=require('async')

const {aegv: [,,...url]} = process

async.map(url, (url,callback)=>{

})

```
* utilizamos el modulo [Async](https://www.npmjs.com/package/async)
* la funcion [map](https://caolan.github.io/async/docs.html) se encarga de acumular los resultados y de ordenarlos, por tanto no necesitamos delcarar las dos variables anteriores. Este map se ejecutará de forma asincrona.
* al llamar al callback se ejecuta la segunda parte de la funcion map
  * en dicha funcion comprobamos si ha habido error y en caso de que haya tenido exito mostramos los resultados 

# Solucion alternativa mediante Promises

```javascript

```
* el Promise.all() se espera a que todos las promises terminen.
  * Crea un resultado que contiene los resultados de cada promise ordenados en el mismo orden que han sido creadas las promises