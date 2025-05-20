// Login Logout

// 1. Hardcoded credentials 
const validUsername = "admin";
const validPassword = "1234";

// 2. Select important elements
const loginScreen = document.getElementById("login-screen");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const adminPanel = document.getElementById("admin-panel");
const logoutBtn = document.getElementById("logout-btn");

// 3. Check login status on page load
window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn === "true") {
    showAdminPanel();
  } else {
    showLoginScreen();
  }
});

// 4. Login form submit handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === validUsername && password === validPassword) {
    // Successful login
    localStorage.setItem("loggedIn", "true");
    showAdminPanel();
  } else {
    // Failed login
    loginError.textContent = "Invalid username or password.";
  }
});

// 5. Logout button handler
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  showLoginScreen();
});

// 6. Helper functions 
function showLoginScreen() {
  loginScreen.style.display = "block";
  adminPanel.style.display = "none";
  loginError.textContent = "";
}

function showAdminPanel() {
  loginScreen.style.display = "none";
  adminPanel.style.display = "block";
  loadPosts(); // Load posts when panel is shown
  loadSettings(); // For changing setting of blog's title and tagline
}


// Add, Edit and Delete post

let editIndex = null; // null means we're adding, not editing

//  Post Form Elements 
const postForm = document.getElementById("post-form");
const postTitleInput = document.getElementById("post-title");
const postContentInput = document.getElementById("post-content");
const postList = document.getElementById("post-list");

// Load existing posts on page load
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  postList.innerHTML = ""; // Clear current list

  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-item");
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="editPost(${index})">Edit</button>
      <button onclick="deletePost(${index})">Delete</button>
    `;
    postList.appendChild(postDiv);
  });
}

// Handle Post Form Submission
postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = postTitleInput.value.trim();
  const content = postContentInput.value.trim();

  if (!title || !content) return;

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (editIndex !== null) {
    // editing an existing post of editIndex
    posts[editIndex] = { title, content };
    editIndex = null; // Reset
  } else {
    // adding a new post
    posts.push({ title, content });
  }

  localStorage.setItem("posts", JSON.stringify(posts));

  postForm.reset();
  loadPosts(); // refresh the list
});

function editPost(index) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts[index];

  postTitleInput.value = post.title;
  postContentInput.value = post.content;
  editIndex = index;
}

function deletePost(index) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}

// Make editPost & deletePost Available to HTML, To allow buttons to call these functions ???
window.editPost = editPost;
window.deletePost = deletePost;


// Edit Blog's Title and Tagline

const settingsForm = document.getElementById("settings-form");
const siteTitleInput = document.getElementById("site-title");
const siteTaglineInput = document.getElementById("site-tagline");

function loadSettings() {
  const title = localStorage.getItem("siteTitle") || "";
  const tagline = localStorage.getItem("siteTagline") || "";

  siteTitleInput.value = title;
  siteTaglineInput.value = tagline;
}

settingsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = siteTitleInput.value.trim();
  const tagline = siteTaglineInput.value.trim();

  localStorage.setItem("siteTitle", title);
  localStorage.setItem("siteTagline", tagline);

  alert("Site settings saved!");
});




