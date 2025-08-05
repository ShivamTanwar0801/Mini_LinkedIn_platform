import { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../api";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  const handleCreate = async (text) => {
    await createPost({ text });
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Home Feed</h2>
      <PostForm onCreate={handleCreate} />
      {posts.length === 0 ? (
        <p className="text-gray-500 italic">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            clickable={true}
            showAuthor={true}
          />
        ))
      )}
    </div>
  );
}
