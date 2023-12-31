

const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim(); 
    const content = document.querySelector('#blog-content').value.trim(); 
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile'); 
      } else {
        alert('Failed to create user');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-user-form') 
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blog-list')
    .addEventListener('.click', delButtonHandler);
  