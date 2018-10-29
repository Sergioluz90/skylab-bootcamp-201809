let sum = 0

debugger

for (let i = 2; i < process.argv.length; i++){
    sum = sum + Number(process.argv[i])
}

console.log(sum)