import React from 'react'
import NavbarAdmin from '../../../components/NavbarAdmin'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Api from '../../../service/api';

const token = Cookies.get('token');
function CreateUser() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [role, setRole] = useState('');

    const [validation, setValidation] = useState([]);

    const roles = ['Admin', 'Kasir', 'Pengolahan', 'Kurir'];

    const CreateUser = async (e) => {
        e.preventDefault();

        Api.defaults.headers.common['Authorization'] = token;
        await Api.post('/user', {
            username: username,
            password: password,
            role: role
        })
            .then(() => {
                navigate('/admin/home')
            })
            .catch(error => {
                setValidation(error.response.data);
            })
    }

    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>

            <div>
                <h1>halaman create user</h1>
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

                <form onSubmit={CreateUser}>
                    <div>
                        <label>Username </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div>
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            {roles.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>
                                    {roleOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">UPDATE</button>
                </form>
        </div>
    )
}

export default CreateUser
