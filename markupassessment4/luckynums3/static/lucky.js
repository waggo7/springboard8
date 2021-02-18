// /** processForm: get data from form and make AJAX call to our API. */

const formData = { 'year': year };


async function processForm(evt) {
    evt.preventDefault();
    var year = document.getElementById('year').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var color = document.getElementById('color').value;
    coloroptions = ("red", "green", "yellow");
    var num = Math.floor(Math.random() * Math.max(100))
    let num_fact = await axios.get(`http://numbersapi.com/${num}`)
    const numData = { 'num': num, 'fact': num_fact.data }
    const yearInfo =
        await axios.get(`http://numbersapi.com/${year}/year`)
    const birthyear = {
        'fact': yearInfo.data,
        'year': year
    }
    if (email.includes('@') == false) {
        var erremmail = document.getElementById('email-err');
        return erremmail.append("please enter ivalid input");
    }
    if (name === false) {
        var errname = document.getElementById('name-err')
        return errname.append('please enter a valid value')
    } else {
        const result = {
            'name': name,
            'year': birthyear,
            'email': email,
            'color': color,
            'num': numData
        };
        return handleResponse(result);
    }

}
/** handleResponse: deal with response from our lucky-num API. */

async function handleResponse(resp) {
    const response = await axios.post("/api/get-lucky-num/", resp)
    let year_fact = resp.year
    let num_fact = resp.num
    const resultForm =
        $("#lucky-results");
    console.log(resp.num);
    return resultForm.append(`Your lucky number is ${num_fact.num} ${num_fact.fact}.
Your birth year ${year_fact.year} fact is ${year_fact.fact}.`);
}

function hello() {
    return console.log('hello world');
}
$('#lucky-form').on("submit", processForm);