/** Command-line tool to generate Markov text. */

const fs = require('fs')
const markov = require("./markov")
const axios = require('axios')
const process = require('process')
const { MarkovMachine } = require('./markov')

function writeText(text) {
    let mm = new MarkovMachine(text)
    console.log(mm.makeText());
}

function makeRoute(url) {
    fs.readFile(url, function checkerr(err, info) {
        if (err) {
            console.log(`Error occured please chek ${url}: ${err}`);
            process.exit(1)
        } else {
            writeText(info)
        }
    })
}


async function makeURLText(url) {
    let result;
    try {
        result = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(result.data)
}


let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeURLText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}