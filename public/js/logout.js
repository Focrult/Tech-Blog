function logout() {
    fetch('/logout', {
      method: 'POST'
    })
    .then(response => {
      if (response.redirected) {
        // redirect the user to the login page
        window.location.href = response.url;
      } else {
        // handle error if there is one
        console.error('Logout error:', response.status);
      }
    })
    .catch(error => console.error('Logout error:', error));
  }