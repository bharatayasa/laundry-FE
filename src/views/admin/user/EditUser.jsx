import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Api from '../../../service/api';
import NavbarAdmin from '../../../components/NavbarAdmin'

function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [role, setRole] = useState('');
    
    const [validation, setValidation] = useState([]);

    const roles = ['Admin', 'Kasir', 'Pengolahan', 'Kurir'];
    
    const fetchDetailUser = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        await Api.get(`/user/${id}`)
            .then(response => {
                const user = response.data.data[0];
                setUsername(user.username);
                setRole(user.role);
            })
            .catch(error => {
                setValidation(error.response.data);
            });
    }
    

    useEffect(() => {
        fetchDetailUser();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;
        await Api.put(`/user/${id}`, {
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
                <form onSubmit={updateUser}>
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
        </div>
    )
}

export default EditUser