var addUserButton = document.getElementById('addUserButton')
var addUserFormContainer = document.getElementById('employee-form')
var addUserForm = document.getElementById('addUserForm')

var showUserButton = document.getElementById('showUserButton')
var showUserFormContainer = document.getElementById('employee-details')
var showUserForm = document.getElementById('showUserForm')

const adduserSubmitBtn = document.getElementById('adduserSubmitBtn')


var isFormVisible = false;

addUserButton.addEventListener('click', (e) => {
    console.log("Button Clicked");
    addUserForm.className = "form-visible"

})



showUserButton.addEventListener('click', async (e) => {
    const ul = document.getElementById('authors');
    const list = document.createDocumentFragment();
    const url = 'http://localhost:3000/management/getusers';

    try {
        var userResponse = await fetch(url);
        var data = await userResponse.json()
        console.log(data);

        var allusers = [];
        if (userResponse.status === 200) {
            data["data"].map(user => {
                allusers.push(`
                <p>${user["name"]}</p><p>${user["email"]}</p><p>${user["phone"]}</p>

                <div class="ud" id="ud">
                    <button id="update">Update User</button>
                    <button id="delete">Delete User</button>
                </div>

                
                `);
            })
            console.log(...allusers);

            showUserFormContainer.innerHTML = allusers
            document.querySelector("#app").insertAdjacentHTML("'afterbegin", data)
        }

    } catch (error) {
        console.log(error);
    }

})




adduserSubmitBtn.addEventListener('click', async (e) => {

    var username = document.getElementById('inp1').value
    var email = document.getElementById('inp2').value
    var phone = document.getElementById('inp3').value

    if (email) {
        console.log("No email");
        console.log(username);
    }

    console.log(username + " " + email + " " + phone);

    try {
        var response = await fetch('http://localhost:3000/management/addusers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    phone: phone
                })
            })

        if (response.status === 200) {
            console.log("Data added");
        } else {
            console.log("Some error occured")
        }
    } catch (error) {
        console.log(error);
    }


})




