const grocery = require("/.fakeDb")

class ListItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        grocery.push(this)
    }

}