//edit post function
async function editFormHandler(event) {
    event.preventDefault();
  //update title and content 
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();
    console.log(title);
    console.log(content);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          //title and content
          post_id: id,
          title,
          content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

}
// event listener for edit post button
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);