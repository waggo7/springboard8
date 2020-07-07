function createInstructor(firstName, lastName) {
    return {
        firstName,
        lastName
    }
}
/* Write an ES2015 Version */

var favoriteNumber = 42;
var instructor = {
    firstName: "Colt"
}
instructor[favoriteNumber] = "That is my favorite";
//console.log(instructor);

const instructor1 = {
        firstName: "Colt",
        sayHi(str) {
            return "hi";
        },
        sayBye() {
            return this.firstName + " says bye";
        }
    }
    //console.log(instructor1.sayBye());

function createAnimal(species, verb, noise) {
    return {
        species: species,
        [verb]: noise,
    }
}
