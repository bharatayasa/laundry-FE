import React, { useState, useEffect } from 'react';
import NavbarKasir from '../../../components/NavbarKasir';
import Footer from '../../../components/Footer';
import Cookies from 'js-cookie';
import Api from '../../../service/api';
import { Link } from 'react-router-dom';

export default function PakaianIndex() {
    const [pakaians, setPakaian] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('id_pakaian');
    const page = 5;

    const fetchPakaian = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pakaian');
                setPakaian(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the Pakaian", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchPakaian();
    }, []);

    const deletePakaian = async (id) => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                await Api.delete(`/pakaian/${id}`);
                fetchPakaian();
            } catch (error) {
                console.error("There was an error nonaktif the pakaian!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const filteredPakaian = pakaians.filter(pakaian => {
        if (searchCriteria === 'id_pakaian') {
            return pakaian.id_pakaian.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else if  (searchCriteria === 'jenis_pakaian') {
            return pakaian.jenis_pakaian.toLowerCase().includes(searchTerm.toLowerCase());
        } else if  (searchCriteria === 'nama') {
            return pakaian.nama.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return false;
        }
    });

    const indexOfLastPakaian = currentPage * page;
    const indexOfFirstPakaian = indexOfLastPakaian - page;
    const currentPakaian = filteredPakaian.slice(indexOfFirstPakaian, indexOfLastPakaian);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredPakaian.length / page)) {
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
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Pakaian</h1>
            </div>

            <div className='flex mx-auto container mb-5'>
                <div className='btn btn-primary'>
                    <Link to={'/kasir/add/pakaian'}>Add Pakaian</Link>
                </div>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="id_pakaian">ID</option>
                    <option value="jenis_pakaian">Jenis Pakaian</option>
                    <option value="nama">Pelanggan</option>
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
                            <th className='text-lg text-center'>ID pendaftaran</th>
                            <th className='text-lg'>Pelanggan</th>
                            <th className='text-lg'>Jumlah</th>
                            <th className='text-lg'>Jenis Pakaian</th>
                            <th className='text-lg text-center'>Berat</th>
                            <th className='text-lg text-center'>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        currentPakaian.length > 0 
                        ? currentPakaian.map((pakaian, index) => (
                            <tr className='hover' key={pakaian.id_pakaian}>
                                <td className='text-center'>
                                    {indexOfFirstPakaian + index + 1}
                                </td>
                                <td className='text-center'>
                                    {pakaian.id_pakaian}
                                </td>
                                <td className='text-center'>
                                    {pakaian.id_pendaftaran}
                                </td>
                                <td>
                                    {pakaian.nama}
                                </td>
                                <td>
                                    <p>
                                        {pakaian.jumlah} pcs
                                    </p>
                                </td>
                                <td>
                                    {pakaian.jenis_pakaian}
                                </td>
                                <td className='text-center'>
                                    <p>
                                        {pakaian.berat} Kg
                                    </p>
                                </td>
                                <td className='text-center'>
                                    <div className='flex gap-2 justify-center'>
                                        <Link to={`/kasir/edit/pakaian/${pakaian.id_pakaian}`} className='btn btn-primary'>Update</Link>
                                        <button onClick={() => deletePakaian(pakaian.id_pakaian)} className='btn btn-secondary'>Delete</button>
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
                    className={`btn ${currentPage >= Math.ceil(filteredPakaian.length / page) ? 'btn-disabled' : 'btn-primary'}`}
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
