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
 ## Description of my code:

 * To create a package.json:
    > npm init --yes

 * We import the http module
 * We import the [ bufferList bl](https://www.npmjs.com/package/bl) module: this module serves to accumulate the data received
 * In the http.get function we use a pipe() to connect this function to a bl function
 * We apply destructuring to store all the urls we receive as arguments

 * We declare the two variables we will use:
  * One to store the different data we receive
  * Another to count how many complete data packages we received

* We make a forEach to run its content for each url received
  * we create a http.get connection for each url
    * Each answer is connected by a pipe() with a bl that will accumulate all the received data. At the end of the accumulation it will execute the function contained in bl:
      * If there has been an error it will show it on the screen
      * In case there has not been one we will convert the data to string and store it, increase the counter and check if all the calls have been completed.
        * When all calls have been completed we display the data on screen in the order of call using a forEach


# Solucion alternativa con After

```javascript
const http=require ('http')
const after=require('after')

const {aegv: [,,...url]} = process



```

* We use the [After](https://www.npmjs.com/package/after) module
* The function after serves to execute a callback at the end of the urls count
  * Inside this callback we execute a console.log to show on screen the results
* Using the function after saves us from declaring a counter and increasing it in an imperative way


# Solucion alternativa con Async

```javascript
const http=require ('http')
const async=require('async')

const {aegv: [,,...url]} = process

async.map(url, (url,callback)=>{

})

```
* We use the [Async](https://www.npmjs.com/package/async) module
* The [map](https://caolan.github.io/async/docs.html) function is in charge of accumulating the results and sorting them, so we don't need to declare the two previous variables. This map will be executed asynchronously.
* When calling the callback the second part of the function map is executed
  * In this function we check if there has been an error and if it has been successful we show the results 

# Solucion alternativa mediante Promises

#### http-get.js
```javascript
const http = require('http')
const bl = require('bl')

function httpGet(url) {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            res.pipe(bl((err, data) => {
                if (err) return reject(err)

                resolve(data.toString())
            }))
        })
    })
}

module.exports = httpGet
```
#### index.js
```javascript
const httpGet = require('./http-get')

const { argv: [, , ...urls] } = process

const promises = urls.map(url => httpGet(url))

Promise.all(promises)
    .then(results => results.forEach(result => console.log(result)))
```
* Promise.all() waits for all promises to end.
  * Creates a result that contains the results of each promise ordered in the same order that the promises have been created.