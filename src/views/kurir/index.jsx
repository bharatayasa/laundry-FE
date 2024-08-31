import React, { useState, useEffect } from 'react';
import NavbarKurir from '../../components/NavbarKurir'
import Footer from '../../../src/components/Footer';
import Cookies from 'js-cookie';
import Api from '../../service/api';
import { Link } from 'react-router-dom';

function Kurir() {
    const [pengirimans, setPengiriman] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState('id_pengiriman');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const page = 5;

    const fetchPengiriman = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pengiriman');
                setPengiriman(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the Pengiriman", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchPengiriman();
    }, []);

    const deletePengiriman = async (id) => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                await Api.delete(`/pengiriman/${id}`);
                fetchPengiriman();
            } catch (error) {
                console.error("There was an error nonaktif the pengiriman!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const filterPengiriman = pengirimans.filter(pengiriman => {
        if (searchCriteria === 'id_pengiriman') {
            return pengiriman.id_pengiriman.toString().toLowerCase().includes(searchTerm.toLowerCase());
        }else if (searchCriteria === 'id_pengolahan') {
            return pengiriman.id_pengolahan.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return false;
        }
    });

    const indexOfPengiriman = currentPage * page;
    const indexOfFirstPengiriman = indexOfPengiriman - page;
    const currentPengiriman = filterPengiriman.slice(indexOfFirstPengiriman, indexOfPengiriman);


    const nextPage = () => {
        if (currentPage < Math.ceil(filterPengiriman.length / page)) {
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
                <NavbarKurir />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Pengiriman</h1>
            </div>

            <div className='flex mx-auto container mb-5'>
                <div className='btn btn-primary'>
                    <Link to={'/kurir/add'}>Add Pengiriman</Link>
                </div>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="id_pengiriman">ID</option>
                    <option value="id_pengolahan">ID Pakaian</option>
                </select>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder={`Search by ${searchCriteria}`} 
                    className="input input-bordered w-full max-w-xs ml-2"
                />
            </div>

            <div className="overflow-x-auto flex container mx-auto">
                <table className="table bg-primary/5 shadow-xl bordered">
                    <thead>
                        <tr>
                            <th className='text-lg text-center'>No</th>
                            <th className='text-lg text-center'>ID</th>
                            <th className='text-lg text-center'>ID Pengolahan</th>
                            <th className='text-lg'>Kurir</th>
                            <th className='text-lg text-center'>Tgl Pengiriman</th>
                            <th className='text-lg'>Status Pengiriman</th>
                            <th className='text-lg text-center'>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        currentPengiriman.length > 0 
                        ? currentPengiriman.map((pengiriman, index) => (
                            <tr className='hover' key={pengiriman.id_pengiriman}>
                                <td className='text-center'>
                                    {indexOfFirstPengiriman + index + 1}
                                </td>

                                <td className='text-center'>
                                    {pengiriman.id_pengiriman}
                                </td>

                                <td className='text-center'>
                                    {pengiriman.id_pengolahan}
                                </td>

                                <td className='text-center flex gap-3'>
                                    <div className='font-semibold'>
                                        ID: {pengiriman.id_user}
                                    </div>
                                    <div>
                                        {pengiriman.username}
                                    </div>
                                </td>

                                <td>
                                    {pengiriman.tanggal_pengiriman}
                                </td>

                                <td>
                                    {pengiriman.status_pengiriman}
                                </td>

                                <td className='text-center'>
                                    <div className='flex gap-2 justify-center'>
                                        <Link to={`/kurir/update/${pengiriman.id_pengiriman}`} className='btn btn-primary'>Update</Link>
                                        <button onClick={() => deletePengiriman(pengiriman.id_pengiriman)} className='btn btn-secondary'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="7">
                                    <div className='text-center text-secondary'>
                                        Data Belum Tersedia!
                                    </div>
                                </td>
                            </tr>
                        )
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
                    className={`btn ${currentPage >= Math.ceil(filterPengiriman.length / page) ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Next
                </button>
            </div>

            <div className='mt-5'>
                <Footer />
            </div>

        </div>
    )
}

export default Kurir
