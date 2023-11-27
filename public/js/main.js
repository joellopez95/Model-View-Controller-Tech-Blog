// public/main.js

//Fetch data from the server and update the DOM
document.addEventListener('DOMContentLoaded', async function () {
    try {
      // Fetching blog posts from the server
      const response = await fetch('/api/posts');
      const postData = await response.json();
  
      //Display blog posts in the DOM
      const postsContainer = document.getElementById('posts-container');
  
      postData.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <p>Author: ${post.User.username}</p>
          <p>Created on: ${new Date(post.createdAt).toLocaleDateString()}</p>
          <hr>
        `;
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  