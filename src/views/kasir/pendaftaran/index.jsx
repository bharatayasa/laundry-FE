import React from 'react';
import NavbarKasir from '../../../components/NavbarKasir';
import Footer from '../../../components/Footer';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Api from '../../../service/api';
import { Link } from 'react-router-dom';

export default function Pendaftaran() {
    const [pendaftarans, setPendaftarans] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('id_pendaftaran');
    const pendaftaranPerPage = 5;

    const fetchPendaftaran = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pendaftaran');
                setPendaftarans(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pendaftaran", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchPendaftaran();
    }, []);


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const deletePendaftaran = async (id) => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                await Api.delete(`/pendaftaran/${id}`);
                fetchPendaftaran();
            } catch (error) {
                console.error("There was an error deleting pakaian!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const filteredPendaftaran = pendaftarans.filter(pendaftaran => {
        if (searchCriteria === 'id_pendaftaran') {
            return pendaftaran.id_pelanggan.toString().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'id_pelanggan') {
            return pendaftaran.id_pelanggan.toString().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'id_user') {
            return pendaftaran.id_user.toString().includes(searchTerm.toLowerCase());
        } else {
            return false;
        }
    });

    const indexOfLastPendaftaran = currentPage * pendaftaranPerPage;
    const indexOfFirstPendaftaran = indexOfLastPendaftaran - pendaftaranPerPage;
    const currentPendaftaran = filteredPendaftaran.slice(indexOfFirstPendaftaran, indexOfLastPendaftaran);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredPendaftaran.length / pendaftaranPerPage)) {
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
                <NavbarKasir />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Pendaftaran</h1>
            </div>

            <div className='flex mx-auto container mb-5'>
                <div className='btn btn-primary'>
                    <Link to={'/kasir/add/pendaftaran'}>Add Pendaftaran</Link>
                </div>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="id_pendaftaran">ID</option>
                    <option value="id_pelanggan">ID Pelanggan</option>
                    <option value="id_user">ID Kurir</option>
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
                            <th className='text-lg text-center'>No</th>
                            <th className='text-lg text-center'>ID</th>
                            <th className='text-lg'>kurir</th>
                            <th className='text-lg'>Pelanggan</th>
                            <th className='text-lg'>Tgl pendaftaran</th>
                            <th className='text-lg text-center'>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentPendaftaran.length > 0 
                            ? currentPendaftaran.map((pendaftaran, index) => (
                                <tr className='hover' key={pendaftaran.id_pendaftaran}>
                                    <td>
                                        <div className='text-center'>
                                            {indexOfFirstPendaftaran + index + 1}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='text-center'>
                                            {pendaftaran.id_pendaftaran}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row gap-2'>
                                                <p className='font-semibold'>id:</p>
                                                <p>{pendaftaran.id_user}</p>
                                            </div>
                                            <div className='flex flex-row gap-2'>
                                                <p className='font-semibold'>nama:</p>
                                                <p>{pendaftaran.username}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                    <div className='flex flex-col'>
                                            <div className='flex flex-row gap-2'>
                                                <p className='font-semibold'>id:</p>
                                                <p>{pendaftaran.id_pelanggan}</p>
                                            </div>
                                            <div className='flex flex-row gap-2'>
                                                <p className='font-semibold'>nama:</p>
                                                <p>{pendaftaran.nama}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {pendaftaran.tanggal_pendaftaran}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='flex gap-2 justify-center'>
                                            <Link to={`/kasir/edit/pendaftaran/${pendaftaran.id_pendaftaran}`} className='btn btn-primary'>Update</Link>
                                            <button onClick={() => deletePendaftaran(pendaftaran.id_pendaftaran)} className='btn btn-secondary'>delete</button>
                                        </div>
                                    </td>
                                </tr>

                            )): 
                            <tr>
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
                    className={`btn ${currentPage >= Math.ceil(filteredPendaftaran.length / pendaftaranPerPage) ? 'btn-disabled' : 'btn-primary'}`}
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
