/*

Object Destructuring 1

let facts = { numPlanets: 8, yearNeptuneDiscovered: 1846 };
let { numPlanets, yearNeptuneDiscovered } = facts;
 console.log(numPlanets); 
//answer-->  8
 console.log(yearNeptuneDiscovered);
//answer-->  1846


Object Destructuring 2

 let planetFacts = {
     numPlanets: 8,
     yearNeptuneDiscovered: 1846,
     yearMarsDiscovered: 1659
 };
let { numPlanets, ...discoveryYears } = planetFacts;

//answer-- > { numPlanets: 8, yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 }


Object Destructuring 3

 function getUserData({ firstName, favoriteColor = "green" }) {
     return `Your name is ${firstName} and you like ${favoriteColor}`;
 }

 getUserData({ firstName: "Alejandro", favoriteColor: "purple" });
 // answer-->"Your name is Alejandro and you like purple"
 getUserData({ firstName: "Melissa" })
 // answer-->"Your name is Melissa and you like green."
 getUserData({}) 
 // answer-->"Your name is and you like green"


Array Destructuring 1


let [first, second, third] = ["Maya", "Marisa", "Chi"];

// // answer--> Maya
// // answer--> Marisa
// // answer--> Chi



Array Destructuring 2


 let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
     "Raindrops on roses",
     "whiskers on kittens",
     "Bright copper kettles",
     "warm woolen mittens",
     "Brown paper packages tied up with strings"
 ]

// answer-->Raindrops on roses
//answer-->  whiskers on kittens
// answer-->"Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"


Array Destructuring 3


let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

//answer--> 10,30,20
*/

var obj = {
    numbers: {
        a: 1,
        b: 2
    }
};

var a = obj.numbers.a;
var b = obj.numbers.b;

//answer
const obj = {
    numbers: {
        a: 1,
        b: 2
    }
};
const { a, b } = obj.numbers;

var arr = [1, 2];
 var temp = arr[0];
 arr[0] = arr[1];
 arr[1] = temp;

var arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]]


const raceResults = ([first, second, third, ...rest]) =>
    ({
        first,
        second,
        third,
        rest
    })


//console.log(raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre']));
