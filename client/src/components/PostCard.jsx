import { Link } from "react-router-dom";

export default function PostCard({ post, clickable = true, showAuthor = true }) {
  if (!post) return null;

  const userId = typeof post.userId === "string" ? post.userId : post.userId?._id;
  const userName = typeof post.userId === "object" ? post.userId?.name : "User";
  const avatarInitial = userName?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-200 mt-2">
      {/* Author Info (optional) */}
      {showAuthor && (
        <div className="flex items-center justify-between mb-2">
          {clickable ? (
            <Link to={`/profile/${userId}`} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                {avatarInitial}
              </div>
              <span className="text-gray-800 font-semibold group-hover:text-blue-600 transition">
                {userName}
              </span>
            </Link>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                {avatarInitial}
              </div>
              <span className="text-gray-800 font-semibold">{userName}</span>
            </div>
          )}
        </div>
      )}

      {/* Post Text */}
      <p className="text-gray-700 mb-2 break-words">{post.text}</p>

      {/* Post Date (always visible) */}
      <div className="text-right text-xs text-gray-400">
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
