 # MY FIRST ASYNC I/O! (Exercise 4 of 13)

  Write a program that uses a single asynchronous filesystem operation to
  read a file and print the number of newlines it contains to the console
  (stdout), similar to running cat file | wc -l.

  The full path to the file to read will be provided as the first
  command-line argument.


----
 #### My Code:

```javascript
const fs = require('fs')

const [,, file]

function callback(err, contents) {
    if (err) throw err

    const lines = contents.toString().split('\n').length - 1
    console.log(lines)
}

fs.readFile(file, 'utf8', callback)
```


 #### Solution:

```javascript
var fs = require('fs')
var file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) {
    return console.log(err)
  }
  // fs.readFile(file, 'utf8', callback) can also be used
  var lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
```

 ## Differences to be taken into account:
* Using a callback allows us to control errors 
* If the function we have it to part allows us a greater abstraction of the code
