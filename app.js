const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const commentsUrl = "https://jsonplaceholder.typicode.com/comments";

async function getUsers() {
  try {
    const response = await fetch(usersUrl);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

async function getUserPosts(userId) {
  try {
    const response = await fetch(`${postsUrl}?userId=${userId}`);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function getPostComments(postId) {
  try {
    const response = await fetch(`${commentsUrl}?postId=${postId}`);
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

async function displayUsers() {
  const usersContainer = document.getElementById("users");
  const users = await getUsers();

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    userDiv.innerHTML = `
      <h2>${user.name}</h2>
      <p>${user.email}</p>
    `;
    userDiv.addEventListener("click", () => displayUserPosts(user.id));
    usersContainer.appendChild(userDiv);
  });
}

async function displayUserPosts(userId) {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  const posts = await getUserPosts(userId);

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
      <h3 class="post-title">${post.title}</h3>
      <p>${post.body}</p>
    `;
    postDiv.addEventListener("click", () => displayPostComments(post.id));
    postsContainer.appendChild(postDiv);
  });
}

async function displayPostComments(postId) {
  const commentsContainer = document.getElementById("comments");
  commentsContainer.innerHTML = "";

  const comments = await getPostComments(postId);

  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.innerHTML = `
      <h4>${comment.name}</h4>
      <p class="comment-body">${comment.body}</p>
    `;
    commentsContainer.appendChild(commentDiv);
  });
}

displayUsers();
