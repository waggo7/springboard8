const fs = require('fs');
const process = require('process')

function cat(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1)
        } else {
            console.log(data);

        }
    })
}

const axios = require('axios')

async function webCat(url) {
    try {
        let response = await axios.get(url)
        console.log(resp.data);
    } catch (err) {
        console.log(`err at ${err}`);
        process.exit(1)
    }
    let path = process.argv[2];
    if (path.slice(0, 4) === 'http') {
        webCat(path);
    } else {
        cat(path);
    }
}