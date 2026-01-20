import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const PostContext = createContext();

// Hook to use context value
export const usePost = () => useContext(PostContext);

// Constants
const API_URL = 'http://localhost:3000/api';

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();
    
    const createPost = async postData => {
        try {
            const res = await fetch(API_URL + '/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...postData, userId: user.id})
            });

            const data = await res.json();

            if(!res.ok) {
                alert(data.message);
                return;
            }

            setPosts([...posts, data]);
        } catch(err) {
            console.log(err);
        }
    };

    // Get specific user posts
    const getUserPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/post/user/${user.id}`);

            const data = await res.json();

            if(!res.ok) {
                alert(data.message);
                return;
            }

            setPosts(data);
        } catch(err) {
            console.log(err);
        }
    };

    // Get all users posts
    const getPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/post`);

            const data = await res.json();

            if(!res.ok) {
                alert(data.message);
                return;
            }

            setPosts(data);
        } catch(err) {
            console.log(err);
        }
    };

    // Delete post
    const deletePost = async (post, refetchCallback) => {
        try {
            const res = await fetch(`${API_URL}/post/${post.id}/${user.id}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if(!res.ok) {
                alert(data.message);
                return;
            };

            // Re-fetch appropriate data instead of using server response
            if(refetchCallback) {
                await refetchCallback();
            } else {
                setPosts(data);
            }
            alert("Post deleted Successfully!");
        } catch(err) {
            console.log(err);
        }
    };

    // Edit post
    const editPost = async (postId, data, refetchCallback) => {
        try {
            const res = await fetch(`${API_URL}/post/${postId}/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if(!res.ok) {
                alert(result.message);
                return;
            }

            // Re-fetch appropriate data instead of using server response
            if(refetchCallback) {
                await refetchCallback();
            } else {
                setPosts(result);
            }
            alert("Post changed succesfully!");
        } catch(err) {
            console.log(err);
        }
    };


    return (
        <PostContext.Provider value={{createPost, posts, getUserPosts, getPosts, deletePost, editPost}}>
            { children }
        </PostContext.Provider>
    )
}