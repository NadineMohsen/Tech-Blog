//  login submission 
async function loginFormHandler(event) {
    event.preventDefault();
    // username and password from input fields
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      //goes to dashboard after logging in
      if (response.ok) {
        console.log('Logged In');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
//event listener for login form 
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
