import PostComponent from "./PostComponent.jsx";

function PostList ({posts}) {


    return (
        <div>
            {posts.map((post) => (
                <PostComponent key={post.id} post={post}/>
            ))}
        </div>
    )
}

export default PostList