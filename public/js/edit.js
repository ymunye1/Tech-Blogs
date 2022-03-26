const editButtonHandler = async (event) => {


  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    

    const response = await fetch(`/api/projects/${id}`, {
      method: 'put',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update project');
    }
  }
};

document
.querySelector('.edit')
.addEventListener('click', editButtonHandler);