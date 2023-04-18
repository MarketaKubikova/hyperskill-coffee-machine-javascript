function sum(numbers) {
    let sum = 0;
    for (let number of numbers) {
        if (number === 0) {
            break;
        }
        sum += number;
    }

    return sum;
}
