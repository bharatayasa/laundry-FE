import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarAdmin from '../../../components/NavbarAdmin'
import Footer from '../../../components/Footer';
import Cookies from 'js-cookie';
import Api from '../../../service/api';

function Laporan() {
    const [laporans, setLaporan] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('id_laporan');
    const laporanPerPage = 5;

    const fetchLaporan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;
        
        if (token) {
            try {
                const response = await Api.get('/laporan');
                setLaporan(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the laporan!", error);
            }
        }else {
            console.error("Token is not available!");
        }
    }

    useEffect(() => {
        fetchLaporan()
    }, []);

    const deleteLaporan = async (id) => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                await Api.delete(`/laporan/${id}`);
                fetchLaporan();
            } catch (error) {
                console.error("There was an error nonaktif the laporan!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredLaporan = laporans.filter(laporan => {
        if (searchCriteria === 'username') {
            return laporan.username.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'status_cuci') {
            return laporan.status_cuci.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'id_laporan') {
            return laporan.id_laporan.toString().includes(searchTerm);
        } else {
            return false;
        }
    });

    const indexOfLastLaporan = currentPage * laporanPerPage;
    const indexOfFirstLaporan = indexOfLastLaporan - laporanPerPage;
    const currentLaporan = filteredLaporan.slice(indexOfFirstLaporan, indexOfLastLaporan);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredLaporan.length / laporanPerPage)) {
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
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Laporan</h1>
            </div>

            <div className='flex mx-auto container mb-5'>
                <div className='btn btn-primary'>
                    <Link to={'/admin/add/laporan'}>Add Laporan</Link>
                </div>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="id_laporan">ID</option>
                    <option value="username">Admin</option>
                    <option value="status_cuci">Status Cuci</option>
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
                <table className="table bg-primary/5 shadow-xl bordered">
                    <thead>
                        <tr>
                            <th className='text-lg'>No</th>
                            <th className='text-lg'>ID</th>
                            <th className='text-lg'>Admin</th>
                            <th className='text-lg'>Tanggal</th>
                            <th className='text-lg'>Biaya</th>
                            <th className='text-lg'>Status</th>
                            <th className='text-lg'>Pengiriman</th>
                            <th className='text-lg'>keterangan</th>
                            <th className='text-lg text-center'>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentLaporan.length > 0 
                            ? currentLaporan.map((laporan, index) => (
                                <tr className='hover' key={laporan.id_laporan}>
                                    <td>
                                        <div className='text-sm'>
                                            {indexOfFirstLaporan + index + 1}
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div className='text-sm'>
                                            {laporan.id_laporan}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='text-sm'>
                                            {laporan.username}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex lg:flex-row flex-col lg:gap-2 text-justify text-xs">
                                                <p className="font-semibold text-primary">Created:</p>
                                                <p className="whitespace-nowrap">{laporan.tanggal_laporan}</p>
                                            </div>
                                            <div className="flex lg:flex-row flex-col lg:gap-4 text-justify text-xs">
                                                <p className="font-semibold text-secondary">Daftar:</p>
                                                <p className="whitespace-nowrap">{laporan.tanggal_pendaftaran}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className='text-sm'>
                                            {laporan.total_biaya}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='text-sm'>
                                            {laporan.status_cuci}
                                        </div>
                                    </td>

                                    <td className=''>
                                        <div className='lg:flex gap-4'>
                                            {laporan.status_pengiriman}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='text-sm text-justify'>
                                            {laporan.keterangan}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='flex gap-2 justify-center'>
                                            <Link to={`/admin/edit/laporan/${laporan.id_laporan}`} className='btn btn-primary'>Update</Link>
                                            <button onClick={() => deleteLaporan(laporan.id_laporan)} className='btn btn-secondary'>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )) : 
                            <tr>
                                <td colSpan="9">
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
                    className={`btn ${currentPage >= Math.ceil(filteredLaporan.length / laporanPerPage) ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Next
                </button>
            </div>

            <div className='mt-4'>
                <Footer />
            </div>
        </div>
    )
}

export default Laporan
