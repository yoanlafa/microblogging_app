import PostComponent from "./PostComponent.jsx";

function PostList ({posts, profilePicture}) {


    return (
        <div className="max-w-xl mx-auto p-4">
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <PostComponent key={post.id} post={post} profilePicture={profilePicture}/>
                ))
            ) : (
                <p className="text-gray-500 text-center py-8">No posts yet. Click "Create Post" to make the first one!</p>
            )}
        </div>
    )
}

export default PostList