const newForm = async (event) =>{
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const text = document.querySelector('textarea[name="text"]').value;
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({title,text}),
      headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }};
document.querySelector('#new-post-form')
.addEventListener('submit', newForm);