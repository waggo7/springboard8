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

let categories = [];
/*
Returns array of category ids
 */
async function findQuestionInfo() {
    const response = await axios.get('http://jservice.io/api/random');
    console.log(response);
    const { data } = response;
    const title = data[0].category.title;
    const catId = data[0].category_id;
    const clueCount = data[0].category.clues_count;
    console.log(title, catId, clueCount);

    getCategory(catId);

}

const width = 6;
const height = 7;
let board = [];

function makeTable() {
    for (let x = 0; x <= height; x++) {
        board.push(Array.from({ length: width }))
    }
}

function makeHtmlTable() {
    const board = document.getElementById('table');
    const trow = document.createElement("tr");
    trow.setAttribute("id", "categories");
    trow.classList = "table table-responsive"
    for (let x = 0; x <= width; x++) {
        const headCell = document.createElement("td");
        headCell.id = 'top';

        trow.append(headCell);
    }
    board.append(trow);
    for (let y = 0; y < height; y++) {
        const row = document.createElement("tr");
        row.id = "column"
        row.classList = "table";
        for (let x = 0; x <= width; x++) {
            const cell = document.createElement("td");
            cell.id = "questions";
            row.append(cell);
        }
        board.append(row);
    }
    makeTable();

}

function fillTable(title, id, clueCount) {
    const top = document.getElementById('top');
    for (let x = 0; x <= top.length; x++) {
        console.log(top[0]);
        //console.log(top);
    }
}

function getCategoryIds(id) {


}
/*
 * Return object with data about a category: 
 * Returns { title: "Math", clues: clue-array }
 *  Where clue-array is:
 *   [{question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},]
 */

async function getCategory(catId) { //return the question and anwser like 
    const response = await axios.get(`http://jservice.io/api/category`, { params: { id: catId } });
    const { data } = response;

    const catName = data;
    console.log(catName);
    let clueIndx;
    for (let x = 0; x <= width; x++) {
        clueIndx = data.clues[x];
        categories.push(clueIndx);
    }
    // console.log(data);
    fillTable(catName);
}

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
}


function handleClick(evt) {
    evt.preventDefault();
    evt.target.style.display = "none";
    //addSpinner(evt);
    findQuestionInfo();
    makeHtmlTable();
    fillTable();
}
beginPlay();