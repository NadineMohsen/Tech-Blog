async function signupFormHandler(event) {
    event.preventDefault();
     //username and password from input fields
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //goes to dahboard after sign up
        if (response.ok) {
            console.log('Signed Up');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}
//event listener for sign up form
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);