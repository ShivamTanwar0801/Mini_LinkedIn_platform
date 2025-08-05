const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Register user
export const register = async (data) =>
  fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ allow sending cookies
    body: JSON.stringify(data),
  });

// Login user
export const login = async (data) =>
  fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ allow sending cookies
    body: JSON.stringify(data),
  });

// Get all posts
export const fetchPosts = () =>
  fetch(`${API_BASE}/posts`, {
    credentials: "include", // ✅ protect post feed if needed
  }).then((res) => res.json());

// Create new post
export const createPost = async ({ text }) =>
  fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ text }), // ✅ only send post text
  });

// Fetch user by ID
export const fetchUser = (id) =>
  fetch(`${API_BASE}/users/${id}`, {
    credentials: "include", // ✅ protect user profile route
  }).then((res) => res.json());

// Fetch user posts
export const fetchUserPosts = (id) =>
  fetch(`${API_BASE}/posts/user/${id}`, {
    credentials: "include", // ✅ protect user-specific posts
  }).then((res) => res.json());

// Update user bio
export const updateUserBio = (id, bio) =>
  fetch(`${API_BASE}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ ensure auth cookie is sent
    body: JSON.stringify({ bio }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update bio");
    return res.json();
  });
