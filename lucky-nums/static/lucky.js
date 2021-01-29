/** processForm: get data from form and make AJAX call to our API. */
const response = axios.get('https://numbersapi.com/')

function processForm(evt) {
    evt.preventDefault();
    const $name = $('name');
    const email = document.getElementById('email')
    const color = document.getElementById('color')
    console.log(name, name.data); //testing
    $.ajax({
        url: "/api/get-lucky-number",
        data: {},
        success: function(data) {
            $.each(data, function(i, item) {
                if (item == "num")
                    return item;
            })
        },
        error: function(data) {
            $.each(data, function(i, item) {
                return item + " is not valid please try again";
            })

        }
    })

    const newUser = new UserForm()
    return;
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {}

function hello() {
    return console.log('hello world');
}
$("#lucky-form").on("submit", processForm);