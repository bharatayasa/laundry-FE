import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Api from '../../../service/api';
import NavbarAdmin from '../../../components/NavbarAdmin';
import Footer from '../../../components/Footer';

const token = Cookies.get('token');

function CreateUser() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    const [validation, setValidation] = useState([]);

    const roles = ['Admin', 'Kasir', 'Pengolahan', 'Kurir'];

    const handleCreateUser = async (e) => {
        e.preventDefault();

        Api.defaults.headers.common['Authorization'] = token;
        await Api.post('/user', {
            username: username,
            password: password,
            role: role
        })
            .then(() => {
                navigate('/admin/home');
            })
            .catch(error => {
                setValidation(error.response.data);
            });
    };

    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Tambah User</h1>
            </div>

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
                    <form onSubmit={handleCreateUser} className='flex flex-col gap-2'>
                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">Username
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </label>
                        </div>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">Password
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
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
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='mt-10'>
                <Footer />
            </div>
        </div>
    );
}

export default CreateUser;
