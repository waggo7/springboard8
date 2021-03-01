let url = ("http://numbersapi.com/7/year?json")
let facts = [];
let div = document.getElementById('infodiv')
for (let x = 0; x < 4; x++) {
    facts.push(axios.get(url))
}
Promise.all(facts)
    .then(res => {
        for (x of res) {
            div.append(x.data.text)
        }

    })
    .catch(err => (console.log(err)));

let newdeck = "https://deckofcardsapi.com/api/deck/new/"


let url = "https://deckofcardsapi.com/api/deck/new/draw/?count=2"
let facts = [];
facts.push(axios.get(newdeck))
const id = [];
let value = []
Promise.all(facts).then(res => {
    for (x of res) {
        console.log(x.data.deck_id);
        id.push(x.data.deck_id);
    }
})
let newurl = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=2/`
let card = [axios.get(newurl)]
Promise.all(card).then(res => { console.log(res); })