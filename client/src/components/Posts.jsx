import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";

const Posts = () => {
    const [postId, setPostId] = useState(null);
    const { posts, deletePost, editPost } = usePost();
    const { user } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: e.target.title.value,
            content: e.target.content.value
        };

        e.target.reset();
        editPost(postId, data);
        setPostId(null);
    }

    return (
        <div className="posts-container">
            {
                posts.map(post => {
                    return (
                        <div key={post.id} className="post-card">
                            {
                                postId && postId === post.id ? (
                                    <form onSubmit={handleSubmit}>
                                        <input type="text" name="title" placeholder={post.title} />

                                        <br />

                                        <textarea name="content" placeholder={post.content}>

                                        </textarea>

                                        <br />

                                        <button onClick={() => setPostId(null)}>Cancel</button>
                                        <button>Submit</button>
                                    </form>
                                ) : (
                                    <>
                                        <h4 className="post-title">{post.title}</h4>
                                        <p className="post-content">{post.content}</p>

                                        {
                                            user.id === post.userId && (
                                                <>
                                                    <button onClick={() => deletePost(post)}>Delete</button>
                                                    <button onClick={() => setPostId(post.id)}>Edit</button>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                            
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Posts;