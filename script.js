

const loginForm = document.querySelector('.Login-form')
const regForm = document.querySelector('.reg-form')
const loginBtn = document.querySelector('#login-btn')
let loginCont = document.querySelector('.signup')
let loader = document.querySelector('.loader')
let regLink = document.querySelector('.login p a')
let loginLink = document.querySelector('.register p a')
let loginPage = document.querySelector('.login')
let regPage = document.querySelector('.register')


const scriptURL = "https://script.google.com/macros/s/AKfycbzLhQUj4cA2fPSYQy8wJH2PndKP-Mrckx8L89aPPtlys_19uOQmOZJpxuiAj1tLk8zH_g/exec"; // from Apps Script

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
      console.log(data.message);
      console.log(data.id);
      if (data.success) {
        // alert("Logged In");
        let userName = document.querySelectorAll('.username')
        userName.forEach((user) => {
          user.textContent = data.message
        })
        loginCont.classList.add('inactive')
        loginBtn.textContent = 'Logout'
        loginBtn.onclick = logoutUser;
        loginCont.classList.remove("blur-effect");

      }
      loader.style.display = 'none'
    });
}
loginBtn.onclick = null;



loginForm.addEventListener('submit', (e) => {
  loginCont.classList.add("blur-effect");
  loader.style.display = 'block'
  e.preventDefault()
  loginUser()
})

regForm.addEventListener('submit', (e)=>{
  regPage.classList.add("blur-effect");
  loader.style.display = 'block'
  e.preventDefault()
  registerUser()
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