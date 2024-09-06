import React, { useState, useEffect } from 'react';
import Footer from '../../../src/components/Footer';
import Cookies from 'js-cookie';
import Api from '../../service/api';

export default function PengolahanMaster() {
    const [pengolahans, setPengolahan] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('id_pengolahan');
    const [currentPage, setCurrentPage] = useState(1);
    const page = 5;

    const fetchPengolahan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pengolahan');
                setPengolahan(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the Pengolahan", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchPengolahan();
    }, []);

    const filterPengolahan = pengolahans.filter(pengolahan => {
        if (searchCriteria === 'id_pengolahan') {
            return pengolahan.id_pengolahan.toString().toLowerCase().includes(searchTerm.toLowerCase());
        }else if (searchCriteria === 'id_pakaian') {
            return pengolahan.id_pakaian.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return false;
        }
    });

    const indexOfPengolahan = currentPage * page;
    const indexOfFirstPengolahan = indexOfPengolahan - page;
    const currentPengolahan = filterPengolahan.slice(indexOfFirstPengolahan, indexOfPengolahan);

    const nextPage = () => {
        if (currentPage < Math.ceil(filterPengolahan.length / page)) {
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
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Pengolahan</h1>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="id_pengolahan">ID</option>
                    <option value="id_pakaian">ID Pakaian</option>
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
                            <th className='text-lg text-center'>ID Pakaian</th>
                            <th className='text-lg text-center'>Status Cuci</th>
                            <th className='text-lg text-center'>Status Kering</th>
                            <th className='text-lg text-center'>Status Setrika</th>
                            <th className='text-lg text-center'>Tanggal Mulai</th>
                            <th className='text-lg text-center'>Tanggal Selesai</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        currentPengolahan.length > 0 
                        ? currentPengolahan.map((pengolahan, index) => (
                            <tr className='hover' key={pengolahan.id_pengolahan}>
                                <td className='text-center'>
                                    {indexOfFirstPengolahan + index + 1}
                                </td>

                                <td className='text-center'>
                                    {pengolahan.id_pengolahan}
                                </td>

                                <td className='text-center'>
                                    {pengolahan.id_pakaian}
                                </td>

                                <td className='text-center'>
                                    {pengolahan.status_cuci}
                                </td>

                                <td className='text-center'>
                                    {pengolahan.status_kering}
                                </td>

                                <td className='text-center'>
                                    {pengolahan.status_setrika}
                                </td>

                                <td className='text-center'>
                                    {pengolahan.tanggal_mulai}
                                </td>

                                <td className='text-center'>
                                    {pengolahan.tanggal_selesai}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="9">
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
                    className={`btn ${currentPage >= Math.ceil(filterPengolahan.length / page) ? 'btn-disabled' : 'btn-primary'}`}
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
