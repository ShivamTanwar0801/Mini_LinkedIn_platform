import { useState } from "react";

export default function PostForm({ onCreate }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onCreate(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
        Post
      </button>
    </form>
  );
}