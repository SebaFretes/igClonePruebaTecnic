import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null); // Estado para el avatar
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const sendCredentials = async () => {
        const isLogged = await actions.register(user);
        if (isLogged) {
            navigate('/demo');
        }
        else {
            alert('Unvalid credential');
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="p-4 bg-white shadow-sm rounded">
                    <h1 className="h3 mb-4 text-center">Create your account</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={user.name || ''}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input
                                id="surname"
                                type="text"
                                value={user.surname || ''}
                                onChange={(e) => setUser({ ...user, surname: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={user.username || ''}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={user.password || ''}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Avatar (optional)</label>
                            <input
                                id="avatar"
                                type="file"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                type="button"
                                onClick={sendCredentials}
                                className="btn btn-primary w-100"
                            >
                                REGISTER
                            </button>
                        </div>
                    </form>
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="link-primary">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
