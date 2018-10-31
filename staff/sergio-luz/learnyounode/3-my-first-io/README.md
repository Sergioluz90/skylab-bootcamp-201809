 # MY FIRST I/O! (Exercise 3 of 13)

  Write a program that uses a single synchronous filesystem operation to
  read a file and print the number of newlines (\n) it contains to the
  console (stdout), similar to running cat file | wc -l.

  The full path to the file to read will be provided as the first
  command-line argument (i.e., process.argv[2]). You do not need to make
  your own test file.


----
 #### My Code:

```javascript
const fs = require('fs')

const [,,file]

let buffer = fs.readFileSync(file)

buffer =buffer.toString()

buffer=buffer.split('\n')


console.log (buffer.length-1)
```


 #### Solution:

```javascript
var fs = require('fs')

var contents = fs.readFileSync(process.argv[2])
var lines = contents.toString().split('\n').length - 1
console.log(lines)

// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
```
 ## Description of my code:
* It store the file reading information in a variable called buffer
* Converts this information into a string
* Divides information by line breaks
* Prints the amount of lines we have, subtracting one. This resulting value is the amount of line breaks that create new lines.

 ## Differences to be taken into account:

I apply the destructuring technique to store the second argument I receive. This allows the code to be more semantic and friendly for another developer.