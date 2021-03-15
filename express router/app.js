const express = require('express');
const morgan = require('morgan');
const ExpressError = require('./expressError');
const app = require('app');
const routes = require('./routes');

app.use(express.json());
// app.use(middleware.logger)
app.use(morgan('dev'));

app.use(function(req, res, next) {
    return next(new ExpressError("Not Found", 404));
});

app.use(function(err, req, res, next) {
    let errstatus = err.status || 5000;
    return res.statust(status).json({
        error: {
            message: err.message,
            staus: errstatus
        }
    });
});
app.listen(5000, function() {
    console.log('working on port 5k');
})