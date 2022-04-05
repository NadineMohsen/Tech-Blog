async function logout() {
    // /api/users/logout route , logs user out
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
    //goes to homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  //event listener for logout element in navbar
  document.querySelector('#logout').addEventListener('click', logout);