const express = require("express");
// const ExpressError = require(".ExpressError");
const app = express();
const morgan = require('morgan')
const fs = require('fs');
const url = require('url')
const axios = require("axios")
const { SSL_OP_NETSCAPE_CHALLENGE_BUG } = require("constants");

//app.use(express.json());
app.use(morgan('dev'));
//app.use(ExpressError)
// function logger(req, res, next) {
//     console.log(`recieved a ${req.method} to ${req.path}`);
//     return next()
// }

const args = process.argv[2];

const newargs = []
newargs.push(fs.readFileSync(args, 'utf8'));
// newargs.forEach(function(arr, i) {
//     console.log(arr);
// })
newargs.forEach(function(arr, i) {

        fs.writeFile('./newurls.txt', arr, function(err) {

            if (err) {
                console.log(err);
                process.exit(1)
            }
            console.log(`wrote to ${arr}`);
        });
    }) // async function asycnargs(arr) {

//         arr.forEach(element => {
//             fs.writeFileSync(element);
//             console.log("wrote to" + element);
//         });
//     } catch {
//         console.log("catch");
//     }
// }

// end middleware.logger
app.get('/', function(req, res) {
    return
});
app.listen(5000, function() {
    console.log('ported at the 5k');
})