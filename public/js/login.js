const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      //redirects the user to the dashboard page when login is successful
      window.location.href = '/dashboard';
    } else {
      const errorMessage = document.querySelector('#error-message');
      errorMessage.textContent = data.message;
    }
  })
  .catch(error => console.error('Error logging in:', error));
});