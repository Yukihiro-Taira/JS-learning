function checkNumber(num) {
    if (num % 3 === 0) {
        return "mimble";
    } else if (num % 5 === 0) {
        return "wimble";
    } else {
        return "even";
    }
}

// Create array with numbers 1-100
let resultArray = [];
for (let i = 1; i <= 100; i++) {
    resultArray.push(checkNumber(i));
}

console.log(resultArray);

// Print array with index numbers for better readability
resultArray.forEach((result, index) => {
    console.log(`${index + 1}: ${result}`);
});

//if number is div by 3, type "minmble"
//if number is div by 5, type "wimble"
//if number is an even number, type even