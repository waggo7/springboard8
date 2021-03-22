const express = require('express');
const axios = require('axios'); //changed 'let' to const
const app = express(); //changed 'var' to const

app.use(express.json())
app.post('/', getgit)

// function(req, res, next) {
//     try {
//         let results = req.body.developers.map(async d => {
//             console.log(d);
//             return await axios.get(`https://api.github.com/users/${d}`);
//         });
//         let out = results.map(r => ({ 'name': r.data.name, 'bio': r.data.bio }));

//         return res.send(JSON.stringify(out));
//     } catch {
//         next(err);
//     }
// });

async function getgit(req, res) {
    let results = req.body.developers.map(async d => {
        return await axios.get(`https://api.github.com/users/#${d}`);
        return results
    });
}

app.listen(5000, function() { console.log("on 50k"); });