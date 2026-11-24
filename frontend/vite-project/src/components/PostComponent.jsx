
function PostComponent ({ post }) {
    return (
        <div className="bg-white shadow-md rounded-xs p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-900">
                    {post.username || `User #${post.user_id}`}
                </span>

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