/*var arr = ['one', 'two', 'three'];

var reversed = reverse(arr);

console.log(reversed);
// ['three', 'two', 'one']

console.log(arr);
// ['three', 'two', 'one']

console.log(arr === reversed);
// true*/

function reverse(arr) {
    var reversed = [];
	var pos = 0;

    for (var i= arr.length; i>0; i--) {
        reversed[pos] = arr[i-1];
		pos++;
    }
	arr = reversed;
    return arr;
}

reverse(["uno", "dos", "tres"]);