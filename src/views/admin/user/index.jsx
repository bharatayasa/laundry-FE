import React from 'react'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import Api from '../../../service/api';
import NavbarAdmin from '../../../components/NavbarAdmin';

function index() {
    const [users, setUsers] = useState([]); 

    const fetchDataUsers = async () => {
        const token = Cookies.get('token')

        if (token) {
            Api.defaults.headers.common['Authorization'] = token; 

            try {
                const response = await Api.get('/user'); 
                setUsers(response.data.data)
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    useEffect(() => {
        fetchDataUsers();
    }, []);

    const nonaktofUser = async (id) => {
        const token = Cookies.get('token');
        if (token) {
            Api.defaults.headers.common['Authorization'] = token;
            try {
                
                await Api.delete(`/user/${id}`);
                
                fetchDataUsers();
                
            } catch (error) {
                console.error("There was an error nonaktif the user!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const restore = async (id) => {
        const token = Cookies.get('token');
        if (token) {
            Api.defaults.headers.common['Authorization'] = token;
            try {
                
                await Api.put(`/user/restore/${id}`);
                
                fetchDataUsers();
                
            } catch (error) {
                console.error("There was an error restoring the user!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Users</h1>
            </div>

            <div className='flex mx-auto container'>
                <div className='btn btn-primary'>
                    <Link to="/admin/create/user">Add User</Link>
                </div>
            </div>

            <div className="overflow-x-auto flex container mx-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th className='text-lg'>No</th>
                            <th className='text-center text-lg'>ID User</th>
                            <th className='text-center text-lg'>Username</th>
                            <th className='text-center text-lg'>Role</th>
                            <th className='text-center text-lg'>Date</th>
                            <th className='text-center text-lg'>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.length > 0
                            ? users.map((user, index) => (
                            <tr className='hover'>
                                <td>
                                    <div className='text-lg'>
                                        {index +1}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-center text-lg'>
                                        {user.id_user}
                                    </div>
                                </td>
                                <td>
                                    <div className='text-lg'>
                                        {user.username}
                                    </div>
                                </td>
                                <td>
                                    <div className='text-lg'>
                                        {user.role}
                                    </div>
                                </td>
                                <td className='flex justify-center flex-col'>
                                    <div>
                                        {user.deleted_at}
                                    </div>
                                    <div>
                                        {user.updated_at}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex gap-2 justify-center'>
                                        <button onClick={() => nonaktofUser(user.id_user)} className='btn btn-secondary'>nonaktif</button>
                                        <button onClick={() => restore(user.id_user)} className='btn btn-accent'>aktif</button>
                                        <Link to={`/admin/edit/user/${user.id_user}`} className='btn btn-primary'>Update</Link>
                                    </div>
                                </td>
                            </tr>
                            ))
                            : <tr>
                                    <td>
                                        <div className='text-secondary'>
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                            </tr>
                        }
                        
                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default index
