const dataArr = [];
const $width = 6;
const $height = 6;
const $categories = [];
const $clues = [];
const $answers = [];
var $gameboard = []; /*do not delete need for table*/
let newobj = new Object();
const $spinner = `<div id="spinner" class="spinner-border" role="status">
<span class="sr-only">Loading...</span>
</div>`;


$(document).ready(function() {
    $getCategory($width);
    $beginPlay();


    function $beginPlay() {
        $('#startbtn').click($handleClick)
    }

    function $handleClick() {
        $('#startbtn').html($spinner).fadeOut(500);
        $makeHtmlTable();
        $addClues()
    }

    async function $getCategory($width) { //return the question and anwser like 1
        const response = await axios.get(`http://jservice.io/api/random`, { params: { count: $width } });
        const { data } = response;
        for (let x = 0; x < $width; x++) {

            findCategoryInfo(data[x].category_id);
        }

        //$addClues(newobj)
    }

    async function findCategoryInfo(result) { //creates array of information for the board
        const response = await axios.get('http://jservice.io/api/category', { params: { id: result } });
        const { data } = response;
        const { clues } = data;
        $categories.title = data.title;
        const clickArray = [];
        newobj.title = data.title;
        newobj.clues = clues;
        clickArray.push(newobj);
        return newobj;
    }
    /*
    {

        x,y
        0,0 - 0,1 - 0,2 - 0,3 - 0,4 - 0,5
        1,0 - 1,1 - 1,2 - 1,3 - 1,4 - 1,5
        2,0 - 2.1 - 2,2 - 2,3 - 2,4 - 2,5
        3.0 - 3.1 - 3,2 - 3,3 - 3,4 - 3,5
        4.0 - 4.1 - 4,2 - 4,3 - 4,4 - 4,5

        for(let x=0;x<$width;x++){
            let y = 0;
            let cell1  = $(`${x}`,"0");
            cell1.addEventListenter
        }
    title: "Math",
    clues: [
      { question: "2+2", answer: 4, showing: null },
     { question: "1+1", answer: 2, showing: null }
     */

    function $makeTable() {
        for (let x = 0; x <= $height; x++) {
            $gameboard.push(Array.from({ length: $width }))
        }
    }

    function $makeHtmlTable() { //$makeHtmlTable load after the async function in  order to have the titles loaded after the spinning effect
        const $board = $("#table")
        const $trow = document.createElement('tr');
        for (let x = 0; x < $width; x++) {
            const $CatCell = document.createElement('td');
            $CatCell.id = "0" + " " + x;
            /*starting here*/
            $CatCell.innerText = ($categories.shift());
            /*DO NOT FUCKING CHANGE!!!
            SERIOUSLY DONT TOUCH*/
            $trow.id = ("0", [x]);
            $trow.append($CatCell);
        }
        $board.append($trow);

        for (let x = 0; x < $height - 1; x++) {
            const $cluerows = document.createElement('tr');
            let startingMoney = 200 + (x * 200);
            $cluerows.id = "clue";
            // for (let y = 0; y < $width; y++) {
            for (let y = 0; y < $width; y++) {
                const $qacells = document.createElement('td');
                $qacells.id = 'cell'; //newobj.clues.category_id;
                $qacells.innerText = startingMoney; /*($questionmark); .click(addClues);*/
                $cluerows.append($qacells);
                // addClick(x, y);
            }
            $board.append($cluerows);

        }
        $makeTable();
    }

    // function addClick(x, y) {

    //     let $cells = document.getElementById(`${x}` + `${y}`)
    //     console.log(x, y);
    //     console.log($cells.id);
    //     $cells.click(function(e) {
    //         console.log(e.currentTarget.id);
    //         e.currentTarget.innerText = newobj.clues[x].question;
    //     })
    //     $cells.click(function(e) {
    //             if (e.currentTarget.innerText == newobj.clues[x].question) {
    //                 e.currentTarget.innerText = newobj.clues[x].answer;
    //             }
    //         })
    //         //$categories[x] = $clues[x];
    // }


    function $addClues() {
        $("#table").load(function() {
            console.log("loaded!");
        })
    }

    // function $fillCategories() {
    //     console.log($categories);
    //     const $titles = $("#titles");
    //     for (let x in $titles) {
    //         $titles[x].innerText = ($categories.shift());
    //         //console.log($categories.toString());
    //     }

    //     // ($categories.shift())
    // }

    function $fillTable() {}
    let $questionmark = `<svg width="1em" height="1em" viewBox="0 0 16 16" id="qamark" class="bi bi-patch-question-fll"
  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636zM7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm1.602-2.027c-.05.386-.218.627-.554.627-.377 0-.585-.317-.585-.745v-.11c0-.727.307-1.208.926-1.641.614-.44.822-.762.822-1.325 0-.638-.42-1.084-1.03-1.084-.55 0-.916.323-1.074.914-.109.364-.292.51-.564.51C6.203 6.12 6 5.873 6 5.48c0-.251.045-.468.139-.69.307-.798 1.079-1.29 2.099-1.29 1.341 0 2.262.902 2.262 2.227 0 .896-.376 1.511-1.05 1.986-.648.445-.806.726-.846 1.26z"/>
</svg>`;

});