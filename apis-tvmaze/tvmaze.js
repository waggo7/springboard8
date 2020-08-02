/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */
const fallbackimage = 'https://tinyurl.com/tv-missing'

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
    // TODO: Make an ajax request to the searchShows api.  Remove
    // hard coded data.
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
    const shows = res.data.map(result => {
        let show = result.show;
        console.log(show);
        return {
            id: show.id,
            name: show.name,
            summary: show.summary,
            image: show.image ? show.image.medium : fallbackimage,
        };
    });
    return shows
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 * 
 */

function populateShows(shows) {
    const $showsList = $("#shows-list");
    $showsList.empty();

    for (let show in shows) {
        let $item = $(
            `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}"> 
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
          <button class="btn btn-primary get-episodes">Episodes</button>
           </div>
         </div>
       </div>
      `);
        $showsList.append($item);
    }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
    evt.preventDefault();

    let query = $("#search-query").val();
    if (!query) return;

    $("#episodes-area").hide();

    let shows = await searchShows(query);

    populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
    const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
    // const mapped = res.data.map((result, function() {
    //         (
    //             id: result.id,
    //             name: result.name,
    //             season: result.season,
    //             number: result.number

    //         }));
    let episodes = res.data.map(episode => ({
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number,
    }));
    return episodes;
}

function populateEpisodes(episodes) {
    const $episodesli = $('#episodes-list');
    $episodesli.empty();

    for (let episode of episodes) {
        let $list = $(
            ` <li> 
        ${episode.name} 
        (season${episode.season}, number${episode.number})
        </li> 
        `);
        $episodesli.append($list);
    }
    $episodesli.show();
}
$("#shows-list").on("click", ".get-episodes", async function handleEpisodeClick(evt) {
    let showId = $(evt.target).closest(".Show").data("show-id");
    let episodes = await getEpisodes(showId);
    populateEpisodes(episodes);
});