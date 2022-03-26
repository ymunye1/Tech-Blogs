const commentButtonHandler = async (event) => {


  const text = document.querySelector('#comment').value.trim();
  // const description = document.querySelector('#project-desc').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const project_id = event.target.getAttribute('data-id');

    

    const response = await fetch(`/api/projects/comment`, {
      method: 'POST',
      body: JSON.stringify({ text, project_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add comment');
    }
  }
};

document
.querySelector('#commentbtn')
.addEventListener('click', commentButtonHandler);