function reverse(arr) {
    let newArr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[arr.length - 1 - i];
    }

    return newArr;
}
