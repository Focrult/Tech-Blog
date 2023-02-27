const editForm = document.querySelector('#edit-form');

editForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value;
  const content = document.querySelector('#content-input').value;

  try {
    const response = await fetch('/api/posts/:postId/edit', {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to update post.');
    }

    // Redirect the user to the updated post page on success
    window.location.href = '/posts/:postId';
  } catch (error) {
    console.error(error);
    alert('Failed to update post.');
  }
});