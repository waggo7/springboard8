const express = require('express');
const app = express()
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

//send final information in JSON
app.get('/mean/:num', function(req, res) {
    return console.log(num)
})

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

app.get('/mean', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must enter numbers seperate by commas.', 400)
    }
    let result = {
        operation: "mean",
        result: findMean(nums)
    }

    return res.send(result);
});

app.get('/median', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let result = {
        operation: "median",
        result: findMedian(nums)
    }

    return res.send(result);

});

app.get('/mode', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }
    let result = {
        operation: "mode",
        result: findMode(nums)
    }
    return res.send(result);
});

app.listen(5000, () => {
    console.log('host on 5000');
});