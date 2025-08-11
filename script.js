

const loginForm = document.querySelector('.Login-form')
const loginBtn = document.querySelector('#login-btn')
let loginCont = document.querySelector('.login-container')
let loader = document.querySelector('.loader')

const scriptURL = "https://script.google.com/macros/s/AKfycbxJtoI0R1CYK90sKCV252zuP9eZZJg5k1y1BT-nQZOAEP5SIFV3Uw-z7k1PaFiI43U0/exec"; // from Apps Script

    // function registerUser() {
    //   fetch(scriptURL, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       action: "register",
    //       username: document.getElementById("regUser").value,
    //       password: document.getElementById("regPass").value
    //     })
    //   })
    //   .then(res => res.json())
    //   .then(data => document.getElementById("message").innerText = data.status);
    // }

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
        if (data.success) {
            // alert("Logged In");
            let userName = document.querySelectorAll('.username')
            userName.forEach((user)=>{
                user.textContent= data.message
            })
            loginCont.classList.add('inactive')
            loginBtn.textContent= 'Logout'
        }
        loader.style.display = 'none'
      });
    }

loginForm.addEventListener('submit', (e)=>{
    loginCont.classList.add("blur-effect");
    loader.style.display = 'block'
    e.preventDefault()
    loginUser()
})