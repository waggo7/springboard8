/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled
    doubleValues([1,2,3])  
        out--[2,4,6]
    doubleValues([5, 1, 2, 3, 10])
        out--[10,2,4,6,20]
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.
    showFirstAndLast(['colt', 'matt', 'tim', 'test']);
        out--["ct", "mt", "tm", "tt"];
    (showFirstAndLast(['hi', 'goodbye', 'smile']));
        out-- ['hi', 'ge', 'se'];

Write a function called doubleValuesWithMap which accepts an array and returns a new array with all the values in the array passed to the function doubled
    doubleValuesWithMap([1, -2, -3]);
        out--[2,-4,-6]
    doubleValuesWithMap([1,2,3]);
        out--[2,4,6]


Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.
    valTimesIndex([1,2,3]) 
        out--[0,2,6]
    valTimesIndex([1,-2,-3]) 
        out--[0,-2,-6]

Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.
    extractKey([{ name: 'Elie' }, { name: 'Tim' }, { name: 'Matt' }, { name: 'Colt' }], 'name');
         out--['Elie', 'Tim', 'Matt', 'Colt']

Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first" and the value of a key with the name of  "last" in each object, concatenated together with a space. 
    extractFullName([{ first: 'Elie', last: "Schoppik" }, { first: 'Tim', last: "Garcia" }, { first: 'Matt', last: "Lane" }, { first: 'Colt', last: "Steele" }])
        out--['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']


Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter or undefined if the value is not found in the array.
    find([1, 2, 3, 4, 5], 3) 
        out-- 3
    find([1,2,3,4,5], 10) 
        out-- undefined

Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed. Every character in the new string should be lowercased.
    removeVowels('Elie') 
        out--('l')
    removeVowels('TIM') 
        out--('tm')
    removeVowels('ZZZZZZ') 
        out--('zzzzzz')

Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') 
        out--[{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
    
Write a function called doubleOddNumbers which accepts an array and
returns a new array with all of the odd numbers doubled 
HINT - you can use map and filter to double and then filter the odd numbers.

    doubleOddNumbers([1,2,3,4,5])
        out--[2,6,10]
    doubleOddNumbers([4,4,4,4,4])
        out--[]

Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and returns the array passed to the function with the new key and value added for each object 
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor') 
        out--[{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]

Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the array.

Examples:
    findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true);
        out--expected output {first: 'Tim', last:"Garcia", isCatOwner: true}
*/
//finished Answers here!!
function doubleValues(arr) {
    let result = []
    arr.forEach(function(newarr, i) {
        result.push(arr[i] * 2);
    })
    return result;
}

function onlyEvenValues(arr) {
    let result = []
    arr.forEach(function(item, i, arr) {
        if (arr[i] % 2 == 0) {
            result.push(arr[i])
        }
    })
    return result;
}

function showFirstAndLast(arr) {
    let result = [];
    arr.forEach(function(item, i, array) {
        let names = arr[i];
        let firstLet = names[0];
        let lastLet = names[names.length - 1]
        result.push(firstLet + lastLet);

    })
    return result;
}

function doubleValuesWithMap(arr) {
    let result = []
    arr.forEach(function(item, i, array) {
        if (Number.isInteger(arr[i])) {
            result.push(arr[i] * 2);
        }
    })
    return result;
}
//console.log(doubleValuesWithMap([1, 2, 3]));

function valTimesIndex(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] != NaN) {

            result.push(arr[i] * i);
        }
    }
    return result;
}

function extractKey(arr, key) {
    let result = []
    arr.filter(function(value) {
        result.push(value.name)
    })

    return result;
}

function extractFullName(arr) {
    let result = []
    arr.map(function(key) {
        result.push(key.first + " " + key.last)
    })
    return result;
}

function find(arr, searchValue) {
    //for (let i = 0; i < arr.length; i++) {
    for (let i of arr) {
        if (arr.includes(searchValue)) {
            return searchValue;
        } else {
            return undefined;
        }

    }
}

function removeVowels(str) {
    let result;
    let inputStr = [...str];
    let cons = "bcdfghjklmnopqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
    let answer = inputStr.filter(function(arr, i) {
        for (let con in cons) {
            let con1 = cons[con]
            if (arr == con1) {
                return arr;
            }
        }
    })

    return answer.toString().toLowerCase();
    //return result;
}
console.log(removeVowels('TIM'));

function filterByValue(arr, key) {
    let newKey = key;
    let answer = arr.filter(function(catowners, i) {
        for (let key in catowners) {
            if (key == newKey) {
                return catowners;
            }
        }
    })
    return answer;
}

function doubleOddNumbers(arr) {
    let oddNums = arr.filter(function(odds, o) {
        if (odds % 2 == 1) {
            return odds
        }
    })
    let finalArr = oddNums.map(function(newarr, i, arr2) {
        return newarr * 2;
    })
    return finalArr;
}

function addKeyAndValue(arr, key, value) {
    let arrMap = arr.map(function(arr2, i, arrArr) {
        arr2[key] = value;
        return arr2;
    })
    return arrMap;
}

function findInObj(arr, key, searchValue) {
    let result = {}
    let arrKey = key;
    let arrFilt = arr.filter(function(newarr, i, Arr2) {
        for (let key in newarr) {
            if (!searchValue) return undefined;
            if (arrKey == key) {
                result = key;
                return key;
            }
        }
    })
    return arrFilt[0];
}