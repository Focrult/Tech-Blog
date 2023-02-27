const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const date_created = document.querySelector('#post-date').value.trim();
  
    if (title && content && date_created) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, content, date_created }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  
  // Helper function to format dates Try to import another time!
  const format_date = (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  };
  
  // Get all posts for the user
  const getPosts = async () => {
    const response = await fetch('/api/posts');
    if (response.ok) {
      const posts = await response.json();
      const postList = document.querySelector('.post-list');
      postList.innerHTML = '';
  
      // Render each post to the post list
      posts.forEach((post) => {
        const postCard = document.createElement('div');
        postCard.classList.add('card', 'post-card');
  
        const postCardBody = document.createElement('div');
        postCardBody.classList.add('card-body');
  
        const postCardTitle = document.createElement('h5');
        postCardTitle.classList.add('card-title');
        postCardTitle.textContent = post.title;
  
        const postCardDate = document.createElement('p');
        postCardDate.classList.add('card-text');
        postCardDate.textContent = format_date(post.date_created);
  
        const postCardContent = document.createElement('p');
        postCardContent.classList.add('card-text');
        postCardContent.textContent = post.content;
  
        postCardBody.appendChild(postCardTitle);
        postCardBody.appendChild(postCardDate);
        postCardBody.appendChild(postCardContent);
        postCard.appendChild(postCardBody);
        postList.appendChild(postCard);
      });
    } else {
      alert('Failed to get posts');
    }
  };
  
  getPosts();