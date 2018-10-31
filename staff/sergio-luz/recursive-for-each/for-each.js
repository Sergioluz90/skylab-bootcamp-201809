let index = undefined

function forEach(arr, callback) {
    if (index === undefined) index = 0

    callback(arr[index], index)

    if (index === arr.length - 1) {
        index = undefined
    } else {
        index++
        forEach(arr, callback)
    }
}

module.exports=forEach