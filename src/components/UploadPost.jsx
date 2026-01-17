import { usePost } from "../context/PostContext";

const UploadPost = () => {
    const { createPost } = usePost();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: e.target.title.value,
            content: e.target.content.value
        };

        e.target.reset();
        createPost(data);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h3 className="upload-title">Upload Post</h3>
            <input className="form-input" type="text" name="title" placeholder="Post Title" required />
            <textarea className="form-input form-textarea" name="content" placeholder="Post content" required></textarea>
            <button className="btn btn-primary">Submit</button>
        </form>
    )
};

export default UploadPost;
