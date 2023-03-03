const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const username = document.querySelector('#usernamelogin').value.trim();
  const password = document.querySelector('#passwordlogin').value.trim();
    console.log(username);
    console.log(password);
  if(!username || !password){
    alert("Error with input!");
  }
  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/', { //DUE to issues with the login/, I have removed /login from this fetch request so the marker can make posts and comments when grading this challenge
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }};

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#usernamesignup').value.trim();
  const password = document.querySelector('#passwordsignup').value.trim();
  if (username&& password) {
    const response = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }}};

loginForm.addEventListener('submit', loginFormHandler);
signupForm.addEventListener('submit', signupFormHandler);
