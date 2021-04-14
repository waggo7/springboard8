const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");

describe('sqlForPartialUpdata', function() {
    test("data1", function() {
        const data1 = sqlForPartialUpdate({ key1: "f1" }, {
            key1: "f1",
            key2: "f2"
        });
        expect(data1).toEqual({
            setCols: "\"key1\"=$1",
            values: ["val1"]
        })
    })
    test("data2", function() {
        const data2 = sqlForPartialUpdate({
            key1: 'f1',
            key2: 'f2'
        }, { key1: "v1" });
        expect(data2).toEqual({
            setCols: "\"key1\"=$1,key2 = $2",
            values: ["val1,val2"]
        })
    })
})