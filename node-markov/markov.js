/** Textual markov chain generator */

const { chains } = require("./markov.test");


class MarkovMachine {

    /** build markov machine; read in text.*/
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        // TODO
        let chain = new Map();
        for (let i = 0; i < this.words.length; i += 1) {
            let word = this.words[i];
            let followWord = this.words[i + 1] || null;

            if (chains.has(word)) chains.get(word).push(followWord);
            else chains.set(word, [followWord])
        }
        this.chains = chains;
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        // TODO
        let out = [];
        let keys = Array.from(this.chains.keys());
        let key = MarkovMachine.choice(keys);

        while (out.length < numWords && key !== null) {
            out.push(key);
            key = MarkovMachine.choice(this.chains.get(key));
        }

        return out.join(" ");
    }
}
module.exports = { MarkovMachine, }
    // let result = new MarkovMachine("the car ran awayfrom here");
    // result.makeText();
    // result.makeText(numWords = 50);