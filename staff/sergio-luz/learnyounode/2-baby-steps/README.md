 # BABY STEPS (Exercise 2 of 13)

  Write a program that accepts one or more numbers as command-line arguments
  and prints the sum of those numbers to the console (stdout).


----
 #### My Code:

```javascript
let sum = 0

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

 ## Differences to be taken into account:

 In ES6 is a better practice to use let or const instead of var

 From now on I will use in all the exercises these variables