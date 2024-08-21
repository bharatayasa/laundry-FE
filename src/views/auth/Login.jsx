import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../service/api.js'
import Cookies from 'js-cookie'
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserRole } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [validationErrors, setValidationErrors] = useState([]);
    const [loginFailed, setLoginFailed] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', {
                username: username,
                password: password,
            });

            const { token, User } = response.data.data;

            Cookies.set('token', token);
            Cookies.set('User', JSON.stringify(User));

            setIsAuthenticated(true);
            setUserRole(User.role);

            switch (User.role) {
                case 'Admin':
                    navigate("/admin/home", { replace: true });
                    break;
                case 'Kasir':
                    navigate("/kasir/home", { replace: true });
                    break;
                case 'Pengolahan':
                    navigate("/pengolahan/home", { replace: true });
                    break;
                case 'Kurir':
                    navigate("/kurir/home", { replace: true });
                    break;
                default:
                    navigate("/login", { replace: true });
            }
        } catch (error) {
            if (error.response) {
                setValidationErrors(error.response.data.errors || []);
                setLoginFailed(error.response.data.message || "Login failed. Please try again.");
            } else {
                setLoginFailed("An unexpected error occurred");
            }
        }
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Lorem ipsum dolor sit amet.</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="flex justify-center gap-5">
                            <button className="btn btn-accent"><Link to="/">Kembali</Link></button>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                        {validationErrors.length > 0 && (
                            <div>
                                {validationErrors.map((error, index) => (
                                    <p key={index}>{error.path} : {error.msg}</p>
                                ))}
                            </div>
                        )}
                        {loginFailed && (
                            <div>
                                {loginFailed}
                            </div>
                        )}

                        <form className="card-body" onSubmit={login}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    className="input input-bordered"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        className="input input-bordered w-full"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
