const filterOutOdds = () => {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter((num) => {
        return num % 2 === 0;
    })
}

function findMin(...nums) {
    return nums.reduce((sum, num) => {
        if (sum > num) {
            return num
        } else { return sum }
    })
}

const mergeObjects = (obj, object1) => {
    let obj1 = {...obj };
    let obj2 = {...object1 };
    let obj3 = {...obj1, ...obj2 };
    return obj3;
}

function doubleAndReturnArgs(arr, ...arguments) {
    let arrOg = [...arr]
    let argue = arguments;
    let arr2x = argue.map((arr, i) => {
        return arr * 2;
    })
    arrOg.push(...arr2x);
    return arrOg;
}

function removeRandom(items) {
    let randomItem = Math.floor(Math.random() * items.length)
    return [...items.slice(0, randomItem), ...items.slice(randomItem + 1)]
}

function extend(array1, array2) {

    let arr3 = [...array1, ...array2];
    return arr3;
}

function addKeyVal(obj, key, val) {
    let obj1 = {...obj };
    obj1[key] = val;
    return obj1;
}

function removeKey(obj, key) {
    let obj1 = {...obj };
    delete obj1[key];
    return obj1;
}

function combine(obj1, obj2) {

    let obj3 = {...obj1, ...obj2 };
    return obj3;
}

function update(obj, key, val) {
    let obj1 = {...obj }
    obj1[key] = val;
    return obj1;
}
