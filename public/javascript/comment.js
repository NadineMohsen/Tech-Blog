//comment function
async function commentFormHandler(event) {
    event.preventDefault();
    //comment text
    const comment_text = document.querySelector('input[name="comment-body"]').value.trim();
    //post id
    const post_id = window.location.toString().split('/')[ window.location.toString().split('/').length - 1];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
}

//event listenr for comment form
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);