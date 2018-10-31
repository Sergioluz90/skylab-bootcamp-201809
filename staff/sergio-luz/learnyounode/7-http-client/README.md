 # HTTP CLIENT (Exercise 7 of 13)

  Write a program that performs an HTTP GET request to a URL provided to you
  as the first command-line argument. Write the String contents of each
  "data" event from the response to a new line on the console (stdout).

----
 #### My Code:

```javascript
const http = require('http')

const[,,url] = process.argv

http.get(url,function(res){
    
    res.on('data', function(data){
        console.log(data.toString())
    })
    
})
```


 #### Solution:

```javascript
var http = require('http')

http.get(process.argv[2], function (response) {
    response.setEncoding('utf8')
    response.on('data', console.log)
    response.on('error', console.error)
}).on('error', console.error)
```

 ## Differences to be taken into account:
 * The official solution checks for errors: That's good practice that I recommend.
* > response.setEncoding('utf8') is used to convert the answer to text



 