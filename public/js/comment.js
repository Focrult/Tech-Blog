const commentForm = document.querySelector('#comment-form');

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(commentForm);
  const postId = formData.get('postId');
  const text = formData.get('text');

  try {
    // Submit the comment to the server
    const response = await fetch('/comments', {
      method: 'POST',
      body: JSON.stringify({ postId, text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ERROR status: ${response.status}`);
    }

    //Reload the page to show the new comment! - MENTIONED in previous lesson 
    window.location.reload();
  } catch (error) {
    console.error('Error submitting comment:', error);
    alert('There was an error submitting your comment. Please try again.');
  }
});