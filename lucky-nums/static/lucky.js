/** processForm: get data from form and make AJAX call to our API. */

function processForm(evt) {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const color = document.getElementById('color')
    console.log(name, name.data);
    const $results = $('#lucky-results')
    evt.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/get-lucky-number",
        data: {},
        success: function(data) {
            $.each(data, function(i, item) {
                return item.data;
            })
        }
    })

    const newUser = new UserForm()
    return;
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {}


$("#lucky-form").on("submit", processForm);