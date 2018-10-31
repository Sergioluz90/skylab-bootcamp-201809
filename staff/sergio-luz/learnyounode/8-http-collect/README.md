 # HTTP COLLECT (Exercise 8 of 13)

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
 ## Description of my code:

* We import the [http](https://nodejs.org/api/http.html) module

* We destructure the parameters received through process:
  * We know that the third argument will be a url

* We initiate a client-server connection using the function http.get

  * Every time we receive a data packet the function res.on('data') will be executed:
    * This function is an asynchronous function, therefore it is a non-blocking function.
    * Collect the data in the form of a string in str
    * Accumulate the length of the data in num
    * A more correct way to do this would be to change the content of the function to:
      *  
      ```javascript
        data.setEncoding('utf8')
        num += data.length
        str += data
      ```
      * This way we only transform data into a string once every time we receive data.

  * When the communication ends we will receive an 'end' event and the res.on('end') function will be executed:
    * This function will display on the screen:
      * In the first line the length of the data
      * In the second line the data in text form

 # Differences with regard to the solution:
* It imports the module [ bufferList bl](https://www.npmjs.com/package/bl): this module is used to accumulate the received data

* iI the http.get function uses a pipe() to connect this function to a bl function
  * Within the bl function creates a fucnion that will execute when all data has been received and accumulated
    * Doing so allows you to control errors and be able to perform a single conversion to string the data, thus optimizing the code

# Solucion alternativa modular mediante Promises

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

const { argv: [, , url] } = process

httpGet(url)
    .then(content => console.log(`${content.length}\n${content}`))
```

* Using modules we abstract responsibility for what to do with the information: http.get returns the information through a callback of the promise

  * If it's going well, it'll call resolve.
    * The .then() statement will be executed in the program
  * In case of error it will call reject
    * The .catch() statement will be executed in the program