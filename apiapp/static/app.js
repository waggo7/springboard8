// const randomsearch = document.getElementById('random_search');
// randomsearch.addEventListener('submit', )


async function RandomSearch(evt) {
    evt.preventDefault();
    let result = []
    const getresp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const resp = getresp.data.drinks[0];
    console.log(resp);

    //need to send the full info to the python route 
    return handleSearchClick(resp)
}
async function handleSearchClick(resp) {
    const response = await axios.post("/randomdrink/", resp)
        // const image = document.querySelector('drinkimg')
    return response;
}


$('#random-search').on("submit", RandomSearch);