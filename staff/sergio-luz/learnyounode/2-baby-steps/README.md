 # BABY STEPS (Exercise 2 of 13)

  Write a program that accepts one or more numbers as command-line arguments
  and prints the sum of those numbers to the console (stdout).


----
 #### My Code:

```javascript
let sum = 0

debugger

for (let i = 2; i < process.argv.length; i++){
    sum = sum + Number(process.argv[i])
}

console.log(sum)
```


 #### Solution:

```javascript
var result = 0

for (var i = 2; i < process.argv.length; i++) {
    result += Number(process.argv[i])
}

console.log(result)
```

 <!-- ## Description of my code: -->