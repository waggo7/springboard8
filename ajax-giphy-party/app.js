const $search = $("#search-input")
const $formcontainer = $("#form-container")
const $container = $("#container");


function getinput(res) {

    let numlength = res.data.length;
    if (numlength) {
        let randomIndx = Math.floor(Math.random() * numlength);

        let $newcol = $("<div>", { class: "col-md-4 col-12 mp-4" });
        let $newimage = $("<img>", {
            src: res.data.data[randomIndx].images.original.url,
            class: "w-100"
        })
    }
    $newcol.append($newimage);
    $container.append($newcol);

}
$("form").on("submit", async function(e) {
    e.preventDefault();
    let searchquery = $search.val();
    $search.val("")

    const response = await axios.post("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchquery,
            api_key: "QoU1jGAX8C6CMOW9qbFDs0N1ZgC4GpuV"
        }
    })
    getinput(response.data)
})

$("#delete").on("click", function() {
    $container.empyt();
})