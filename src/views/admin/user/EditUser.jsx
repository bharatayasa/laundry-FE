import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Api from '../../../service/api';
import NavbarAdmin from '../../../components/NavbarAdmin';
import Footer from '../../../components/Footer';

function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validation, setValidation] = useState([]);

    const roles = ['Admin', 'Kasir', 'Pengolahan', 'Kurir'];
    
    const fetchDetailUser = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get(`/user/${id}`);
            const user = response.data.data[0];
            setUsername(user.username);
            setRole(user.role);
        } catch (error) {
            setValidation(error.response.data);
        }
    }

    useEffect(() => {
        fetchDetailUser();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;
        try {
            await Api.put(`/user/${id}`, {
                username: username,
                password: password,
                role: role
            });
            navigate('/admin/home');
        } catch (error) {
            setValidation(error.response.data);
        }
    }

    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Update User</h1>
            </div>

            <div>
                {
                    validation.errors && (
                        <div>
                            {
                                validation.errors.map((error, index) => (
                                    <p key={index}>{error.path} : {error.msg}</p>
                                ))
                            }
                        </div>
                    )
                }
                <div className='flex justify-center'>
                    <div className='bg-primary/25 px-10 py-10 rounded-xl shadow-xl'>
                        <form onSubmit={updateUser} className='flex flex-col gap-2'>
                            <div>
                                <label className="input input-bordered flex items-center gap-2 font-semibold">
                                    Username
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </label>
                            </div>

                            <div>
                                <label className="input input-bordered flex items-center gap-2 font-semibold">
                                    Password
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-xs"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </label>
                            </div>

                            <div>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="select select-bordered"
                                >
                                    {roles.map((roleOption) => (
                                        <option key={roleOption} value={roleOption}>
                                            {roleOption}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='btn btn-primary mt-5'>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <Footer />
            </div>
        </div>
    )
}

export default EditUser;
