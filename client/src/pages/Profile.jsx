import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser, fetchUserPosts, updateUserBio } from "../api";
import PostCard from "../components/PostCard";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState("");

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUser(id).then((fetchedUser) => {
      setUser(fetchedUser);
      setBioInput(fetchedUser.bio || "");
    });
    fetchUserPosts(id).then(setPosts);
  }, [id]);

  const handleBioUpdate = async () => {
    try {
      const updated = await updateUserBio(id, bioInput);
      setUser(updated);
      setEditingBio(false);
    } catch (error) {
      console.error("Failed to update bio", error);
    }
  };

  if (!user)
    return (
      <div className="text-center mt-12 text-gray-600">Loading profile...</div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-3xl font-bold mx-auto sm:mx-0">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className="text-center sm:text-left mt-4 sm:mt-0">
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-700 mb-2">Bio</h4>
        {loggedInUserId === id ? (
          editingBio ? (
            <div>
              <textarea
                className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
              />
              <div className="mt-3 space-x-2">
                <button
                  onClick={handleBioUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingBio(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-700">{user.bio || "No bio provided."}</p>
              <button
                onClick={() => setEditingBio(true)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
            </div>
          )
        ) : (
          <p className="text-gray-700">
            {user.bio || (
              <span className="italic text-gray-400">No bio provided.</span>
            )}
          </p>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">
            This user has not posted anything yet.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                clickable={false}
                showAuthor={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
