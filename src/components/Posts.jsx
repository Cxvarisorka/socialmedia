import { usePost } from "../context/PostContext";

const Posts = () => {
    const { posts } = usePost();

    return (
        <div className="posts-container">
            {
                posts.map(post => {
                    return (
                        <div key={post.id} className="post-card">
                            <h4 className="post-title">{post.title}</h4>
                            <p className="post-content">{post.content}</p>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Posts;