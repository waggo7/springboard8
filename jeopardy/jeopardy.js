// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
const width = 6;
const height = 7;
let board = [];
var count = 0;
let categories = [];
let clues = [];
/*
Returns array of category ids
 */
async function findQuestionInfo(category_id) {
    const response = await axios.get('http://jservice.io/api/category', { params: { id: category_id } });
    const { data, clues } = response;
    categories.push(data.clues);
    // for (let x = 0; x < width; x++) {
    //     console.log(data[x].category);
    // }

}
/** Return object with data about a category: 
 * Returns { title: "Math", clues: clue-array }
 *  Where clue-array is:
 *   [{question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},]
 */


async function getCategory(width) { //return the question and anwser like 1
    const response = await axios.get(`http://jservice.io/api/categories`, { params: { count: width } });

    const { data } = response;
    let result;
    for (let x = 0; x < width; x++) {
        categories.push(data[x].title);
        result = data[x].id;
    }
    console.log(data);
    findQuestionInfo(result);

    //findQuestionInfo(data[x].id)
    //-->only turned off to prevent too many elements being made
}



function makeTable() {
    for (let x = 0; x <= height; x++) {
        board.push(Array.from({ length: width }))
    }
}

function makeHtmlTable() {
    const board = document.getElementById('table');
    const trow = document.createElement("tr");
    let count = 0;
    trow.setAttribute("id", "categories");
    trow.classList = "table table-responsive"
    for (let x = 0; x <= width; x++) {
        const headCell = document.createElement("td");
        count++;
        headCell.id = 'top';
        headCell.classList = "categories"
            //add event listener function(s) here to add clue and answer
            // if (headCell.value == undefined) {
            //     fillTable(headCell);  --->goal here was to iterate the top value and add the categories as the only te
            // }  
        trow.append(headCell);
    }
    board.append(trow);
    for (let y = 0; y < height; y++) {
        count++;
        const row = document.createElement("tr");
        row.id = "row";
        row.classList = "table";
        for (let x = 0; x <= width; x++) {
            const cell = document.createElement("td");
            cell.id = "questions" + x;
            cell.classList = "clues"
            row.append(cell);
        }
        board.append(row);
    }
    makeTable();
}
var top = document.getElementById('top');

function fillTable(categories) {

    // top.addEventListener('click', function() {
    //     top.innerText = el;
    // })
}

function getCategoryIds(id) {}

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {

}

function addSpinner(evt) {

}

const startBtn = document.getElementById('startbtn');

function beginPlay() {
    startBtn.addEventListener("click", handleClick);

    count++;
    console.log(count);
}



function handleClick(evt) {
    //addSpinner(evt); NOT SURE HOW TO BUILD THIS ...YET NEED TO FIGURE OUT CLUE AND ANSWERS IN CLICKS FIRST
    evt.preventDefault();

    evt.target.style.display = "none";

    getCategory(width);
    makeHtmlTable();
    // fillTable();

}
beginPlay();