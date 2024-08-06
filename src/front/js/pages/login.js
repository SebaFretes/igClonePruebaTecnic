import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [user, setUser] = useState({});
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const sendCredentials = async () => {
        const isLogged = await actions.login(user);
        if (isLogged) {
            navigate('/demo');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <div className="p-4 bg-white shadow-sm rounded">
                    <h1 className="h3 mb-4 text-center">Digitalgram</h1>
                    <form>
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
                            <button
                                type="button"
                                onClick={() => sendCredentials()}
                                className="btn btn-primary w-100"
                            >
                                LOG IN
                            </button>
                        </div>
                    </form>
                    <p className="text-center">
                        Don't have an account yet?{" "}
                        <Link to="/register" className="link-primary">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
