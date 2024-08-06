import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
    const [post, setPost] = useState({
        title: '',
        description: '',
        location: '',
        status: 'published', // Valor por defecto
    });
    const [image, setImage] = useState(null);
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (post.message.length < 3 || post.message.length > 100) {
            alert('Caption must be between 3 and 100 characters long');
            return;
        }
        if (post.location.length < 4 || post.location.length > 50) {
            alert('Location must be between 4 and 50 characters long');
            return;
        }

        const formData = new FormData();
        formData.append('message', post.description);
        formData.append('location', post.location);
        formData.append('status', post.status);
        formData.append('author_id', 1); // Cambiar esto al ID del autor en la sesión actual

        if (image) {
            formData.append('image', image);
        }

        const isPosted = await actions.createPost(formData);
        if (isPosted) {
            navigate('/posts'); // Redirige a la página de publicaciones, ajusta según corresponda
        } else {
            alert('Failed to create post');
        }
    };

    return (
        <div className="d-flex flex-column align-items-center min-vh-100 bg-light p-3">
            <div className="w-100" style={{ maxWidth: '600px' }}>
                <div className="p-4 bg-white shadow-sm rounded">
                    <h1 className="h3 mb-4 text-center">New Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            {/* <label htmlFor="image" className="form-label">Image</label> */}
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="title" className="form-label">Title</label> */}
                            <input
                                id="title"
                                type="text"
                                placeholder="Write a caption"
                                value={post.title}
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="location" className="form-label">Location</label> */}
                            <input
                                id="location"
                                type="text"
                                placeholder="Add location"
                                value={post.location}
                                onChange={(e) => setPost({ ...post, location: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                POST AND SHARE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
