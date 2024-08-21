import React from 'react';
import NavbarKasir from '../../../components/NavbarKasir';
import Footer from '../../../components/Footer';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Api from '../../../service/api';
import { Link } from 'react-router-dom';

function Kasir() {
    const [pelanggans, setPelanggans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('nama');
    const pelangganPerPage = 5;

    const fetchPelanggan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pelanggan');
                setPelanggans(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pelanggan", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchPelanggan();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const deletePelanggan = async (id) => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                await Api.delete(`/pelanggan/${id}`);
                fetchPelanggan();
            } catch (error) {
                console.error("There was an error nonaktif the pelanggan!", error);
            }
        } else {
            console.error("Token is not available!");
        }
    }

    const filteredPelanggan = pelanggans.filter(pelanggan => {
        if (searchCriteria === 'nama') {
            return pelanggan.nama.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'email') {
            return pelanggan.email.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCriteria === 'id_pelanggan') {
            return pelanggan.id_pelanggan.toString().includes(searchTerm.toLowerCase());
        } else {
            return false;
        }
    });

    const indexOfLastPelanggan = currentPage * pelangganPerPage;
    const indexOfFirstPelanggan = indexOfLastPelanggan - pelangganPerPage;
    const currentPelanggan = filteredPelanggan.slice(indexOfFirstPelanggan, indexOfLastPelanggan);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredPelanggan.length / pelangganPerPage)) {
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
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Data Pelanggan</h1>
            </div>


            <div className='flex mx-auto container mb-5'>
                <div className='btn btn-primary'>
                    <Link to="/kasir/add/pelanggan">Add Pelanggan</Link>
                </div>
            </div>

            <div className='flex mx-auto container mb-5'>
                <select 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)} 
                    className="select select-bordered w-32 max-w-xs"
                >
                    <option value="nama">Nama</option>
                    <option value="id_pelanggan">ID</option>
                    <option value="email">E-Mail</option>
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
                            <th className='text-lg text-center'>Nama</th>
                            <th className='text-lg text-center'>Alamat</th>
                            <th className='text-lg text-center'>No Hp</th>
                            <th className='text-lg text-center'>E-Mail</th>
                            <th className='text-lg text-center'>Tgl Daftar</th>
                            <th className='text-lg text-center'>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentPelanggan.length > 0 
                            ? currentPelanggan.map((pelanggan, index) => (
                                <tr className='hover' key={pelanggan.id_pelanggan}>
                                    <td>
                                        <div>
                                            {indexOfFirstPelanggan + index + 1}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {pelanggan.id_pelanggan}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {pelanggan.nama}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {pelanggan.alamat}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {pelanggan.no_telepon}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {pelanggan.email}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {pelanggan.tanggal_daftar}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='flex gap-2 justify-center'>
                                            <Link to={`/kasir/edit/pelanggan/${pelanggan.id_pelanggan}`} className='btn btn-primary'>Update</Link>
                                            <button onClick={() => deletePelanggan(pelanggan.id_pelanggan)} className='btn btn-secondary'>delete</button>
                                        </div>
                                    </td>
                                </tr>

                            )): 
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
                    className={`btn ${currentPage >= Math.ceil(filteredPelanggan.length / pelangganPerPage) ? 'btn-disabled' : 'btn-primary'}`}
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

export default Kasir;
