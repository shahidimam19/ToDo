

const loginForm = document.querySelector('.Login-form')
const regForm = document.querySelector('.reg-form')
const loginBtn = document.querySelector('#login-btn')
const loginCont = document.querySelector('.signup')
const loader = document.querySelector('.loader')
const regLink = document.querySelector('.login p a')
const loginLink = document.querySelector('.register p a')
const loginPage = document.querySelector('.login')
const regPage = document.querySelector('.register')
const listContainer = document.querySelector('.listcontainer')
const todoList = document.querySelector('#todo-list ul')
const addTodo = document.getElementById('addTodo')
const activeUser = document.querySelector('#user p')
// console.log(addTodo)




const scriptURL = "https://script.google.com/macros/s/AKfycbw2WB6D0V4n3zbanK9wyGzkLZGfBvE7AOOViIwC9_GqBDAsajIMoyR2TuWtt5WY29tn/exec"; // from Apps Script

function registerUser() {
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      action: "register",
      username: document.getElementById("regUser").value,
      password: document.getElementById("regPass").value,
      name: document.getElementById("name").value,
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.status);
      console.log("register")
      loader.style.display = 'none'
    })
}

function loginUser() {
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      username: document.getElementById("loginUser").value,
      password: document.getElementById("loginPass").value
    })
  })
    .then(res => res.json())
    .then(data => {

      // console.log(data.id);
      if (data.success) {
        console.log(data.sheetData[0])
        console.log(data.name);
        // alert("Logged In");
        let userName = document.querySelectorAll('.username')
        userName.forEach((user) => {
          user.textContent = data.name
          user.setAttribute("sessionId", data.id);
        })
        loginCont.classList.add('inactive')
        loginBtn.textContent = 'Logout'
        loginBtn.onclick = logoutUser;
        loginCont.classList.remove("blur-effect");
        listContainer.style.display = "block"
        data.sheetData.forEach((note) => {
          let noteDiv = document.createElement('li')
          noteDiv.textContent = note[1]
          todoList.appendChild(noteDiv)

        })

      }
      if (loader) loader.style.display = 'none';
    });
}

// ------add data------------------
function addData(id) {
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      action: "addData",
      userId: id,
      rowData: document.getElementById("input-text").value
    })
  })
    .then(res => res.json())
    .then(data => {
      todoList.innerHTML = ""
    })
}


loginBtn.onclick = null;



loginForm.addEventListener('submit', (e) => {
  loginCont.classList.add("blur-effect");
  loader.style.display = 'block'
  e.preventDefault()
  loginUser()
})

regForm.addEventListener('submit', (e) => {
  regPage.classList.add("blur-effect");
  loader.style.display = 'block'
  e.preventDefault()
  registerUser()
})

addTodo.addEventListener('submit', (e) => {
  e.preventDefault()
  let activeSession = activeUser.getAttribute("sessionId")
  addData(activeSession)
  loginUser()
})



// ---------------logout--------------
function logoutUser() {
  // Clear username text
  let userName = document.querySelectorAll('.username');
  userName.forEach((user) => {
    user.textContent = '';
  });

  // Show login form again
  loginCont.classList.remove('inactive');

  // Change button text back to 'Login'
  loginBtn.textContent = 'Login';

  // Optionally, clear input fields
  document.getElementById("loginUser").value = '';
  document.getElementById("loginPass").value = '';
}







regLink.addEventListener('click', () => {
  loginPage.classList.add('hide')
  regPage.classList.add('show')
})

loginLink.addEventListener('click', () => {
  loginPage.classList.remove('hide')
  regPage.classList.remove('show')
})