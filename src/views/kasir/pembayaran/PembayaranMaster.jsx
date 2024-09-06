import React, { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import Cookies from 'js-cookie';
import Api from '../../../service/api';

export default function PembayaranMaster() {
    const [pembayaran, setPembayaran] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('id_pembayaran');
    const pembayaranPerPage = 5;

    const fetchPembayaran = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pembayaran');
                setPembayaran(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pembayaran", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchPembayaran();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredPembayaran = pembayaran.filter(bayar => {
        if (searchCriteria === 'id_pembayaran') {
            return bayar.id_pembayaran.toString().includes(searchTerm);
        } else if (searchCriteria === 'id_pendaftaran') {
            return bayar.id_pendaftaran.toString().includes(searchTerm);
        } else if (searchCriteria === 'status') {
            return bayar.status.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'username') {
            return bayar.username.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return false;
        }
    });

    const indexOfLastPembayaran = currentPage * pembayaranPerPage;
    const indexOfFirstPembayaran = indexOfLastPembayaran - pembayaranPerPage;
    const currentPembayaran = filteredPembayaran.slice(indexOfFirstPembayaran, indexOfLastPembayaran);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredPembayaran.length / pembayaranPerPage)) {
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
            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Pembayaran</h1>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="id_pembayaran">ID</option>
                    <option value="id_pendaftaran">Pendaftaran</option>
                    <option value="status">Status</option>
                    <option value="username">Kasir</option>
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
                            <th className='text-lg text-center'>Pendaftar</th>
                            <th className='text-lg text-center'>Kasir</th>
                            <th className='text-lg text-center'>Total Biaya</th>
                            <th className='text-lg text-center'>Tanggal Pembayaran</th>
                            <th className='text-lg text-center'>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentPembayaran.length > 0 ? (
                            currentPembayaran.map((pembayaran, index) => (
                                <tr className='hover' key={pembayaran.id_pembayaran}>
                                    <td className='text-center'>
                                        {indexOfFirstPembayaran + index + 1}
                                    </td>
                                    <td className='text-center'>
                                        {pembayaran.id_pembayaran}
                                    </td>
                                    <td className='text-center'>
                                        <div className='flex gap-2'>
                                            <div>
                                                id: {pembayaran.id_pendaftaran}
                                            </div>
                                            <div>
                                                {pembayaran.nama}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {pembayaran.username}
                                    </td>
                                    <td className='text-center'>
                                        {pembayaran.total_biaya}
                                    </td>
                                    <td className='text-center'>
                                        {pembayaran.tanggal_pembayaran}
                                    </td>
                                    <td>
                                        {pembayaran.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className='text-center text-secondary'>
                                    Data Belum Tersedia!
                                </td>
                            </tr>
                        )}
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
                    className={`btn ${currentPage >= Math.ceil(filteredPembayaran.length / pembayaranPerPage) ? 'btn-disabled' : 'btn-primary'}`}
                >
                    Next
                </button>
            </div>

            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    );
}
