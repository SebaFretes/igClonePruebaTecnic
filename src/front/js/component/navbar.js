import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Digitalgram
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!store.token ? (
                            <>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-primary me-2 mb-2 mb-sm-0"  // Add margin-end and bottom margin for small screens
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    onClick={() => {
                                        actions.logout();
                                        navigate('/');
                                    }}
                                    className="btn btn-primary"
                                >
                                    Log Out
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
