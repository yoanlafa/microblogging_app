
function PostComponent ({ post, profilePicture }) {
    const picturePath = profilePicture ?? post.profile_picture;
    const profilePictureSrc = picturePath
        ? picturePath.startsWith("http")
            ? picturePath
            : `http://localhost:8000${picturePath}`
        : null;
    const displayName = post.username || `User #${post.user_id}`;

    return (
        <div className="bg-white shadow-md rounded-xs p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                    {profilePictureSrc ? (
                        <img
                            src={profilePictureSrc}
                            alt={`${displayName} profile`}
                            className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold shrink-0">
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <span className="font-bold text-gray-900">
                        {displayName}
                    </span>
                </div>

                <span className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                </span>
            </div>

            <p className="text-gray-800">
                {post.description}
            </p>
        </div>
    )
}

export default PostComponent