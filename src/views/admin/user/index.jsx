import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Api from '../../../service/api';
import NavbarAdmin from '../../../components/NavbarAdmin';
import Footer from '../../../components/Footer';

function Index() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('username');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    const fetchDataUsers = async () => {
        const token = Cookies.get('token');

        if (token) {
            Api.defaults.headers.common['Authorization'] = token;

            try {
                const response = await Api.get('/user');
                setUsers(response.data.data);
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredUsers = users.filter(user => {
        if (searchCriteria === 'username') {
            return user.username.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'role') {
            return user.role.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'id_user') {
            return user.id_user.toString().includes(searchTerm);
        } else {
            return false;
        }
    });

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Users</h1>
            </div>

            <div className='flex mx-auto container mb-5'>
                <div className='btn btn-primary'>
                    <Link to="/admin/create/user">Add User</Link>
                </div>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="username">Username</option>
                    <option value="role">Role</option>
                    <option value="id_user">ID User</option>
                </select>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    placeholder={`Search by ${searchCriteria}`} 
                    className="input input-bordered w-full max-w-xs ml-2"
                />
            </div>

            <div className="overflow-x-auto flex container mx-auto">
                <table className="table bg-primary/5 shadow-xl">
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
                            currentUsers.length > 0
                                ? currentUsers.map((user, index) => (
                                    <tr className='hover' key={user.id_user}>
                                        <td>
                                            <div className='text-lg'>
                                                {indexOfFirstUser + index + 1}
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
                                        <td className='flex justify-center flex-col gap-2'>
                                            <div className='lg:flex gap-4  text-justify'>
                                                <p className='font-semibold text-primary'>Creadet:</p>{user.created_at}
                                            </div>
                                            <div className='lg:flex gap-3 text-justify'>
                                                <p className='font-semibol text-accent'>Updated:</p>{user.updated_at}
                                            </div>
                                            <div className='lg:flex gap-3 text-justify'>
                                                <p className='font-semibold text-secondary'>Nonaktif:</p>{user.deleted_at}
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
                                    <td colSpan="6">
                                        <div className='text-center text-secondary'>
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center mt-4'>
                <button 
                    onClick={prevPage} 
                    className={`btn ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'} mr-2`}
                >
                    Previous
                </button>
                <button 
                    onClick={nextPage}
                    className={`btn ${currentPage >= Math.ceil(filteredUsers.length / usersPerPage) ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Next
                </button>
            </div>
            <div className='mt-4'>
                <Footer />
            </div>
        </div>
    );
}

export default Index;
