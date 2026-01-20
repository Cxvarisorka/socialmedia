import { useEffect } from "react";
import Posts from "../components/Posts";
import { usePost } from "../context/PostContext";

const Feed = () => {
    const { getPosts } = usePost();

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <section className="page-section">
            <h2 className="page-title">Feed</h2>

            <Posts refetchPosts={getPosts} />
        </section>
    )
};

export default Feed;
