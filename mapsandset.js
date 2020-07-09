//What does the following code return?

new Set([1, 1, 2, 2, 3, 4])
    //answer--> set {1,2,3,4}

/*
What does the following code return?\

[...new Set("referee")].join("");
  answer---> 'ref'

What does the Map m look like after running the following code?
*/
let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);

//answer---> { 1: false, 2: false, 3: false }

const hasDuplicate = (array) => {
        let arr = array;
        for (let a in array) {
            if (array.indexOf(array[a]) !== array.lastIndexOf(array[a])) {
                return true;
            }
            return false;
        }
    }
    //hasDuplicate([1, 5, 4]); // true
    //hasDuplicate([1, 5, -1, 4]) // false

const hasvowel = (element) => {
    return 'aeiou'.includes(element);
}
const vowelCount = (string) => {
        let count = 0
        let vowels = ['a', 'e', 'i', 'o', 'u'];
        console.log(vowels.toString(''));
        let str = [...string];
        let newmap = new Map();
        for (let i of str) {
            let strel = i.toLowerCase();
            if (hasvowel(strel)) {
                if (newmap.has(strel)) {
                    newmap.set(strel, newmap.get(strel) + 1);
                } else {
                    newmap.set(strel, 1)
                }
            }
        }
        return newmap;

    }
    //console.log(vowelCount('aweome')); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
    //vowelCount('Colt') // Map { 'o' => 1 } 
    //  */
