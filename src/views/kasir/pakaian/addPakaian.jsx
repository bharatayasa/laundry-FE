import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarKasir from '../../../components/NavbarKasir'
import Api from '../../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../../components/Footer';

function addPakaian() {
    const navigate = useNavigate()

    const [id_pendaftaran, setId_pendaftaran] = useState('');
    const [jenis_pakaian, setJenis_pakaian] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [berat, setBerat] = useState('');

    const [pelanggans, setPelanggans] = useState([]);

    const [validation, setValidation] = useState([]);

    const handleAddPakaian = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        await Api.post('/pakaian', {
            id_pendaftaran: id_pendaftaran,
            jenis_pakaian: jenis_pakaian, 
            jumlah: jumlah, 
            berat: berat
        })
        .then(() => {
            navigate('/kasir/pakaian')
        })
        .catch( error => {
            setValidation(error.response.data);
        })
    }

    const fetchPendaftaran = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pendaftaran');
                setPelanggans(response.data.data);
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

    return (
        <div>
            <div>
                <NavbarKasir />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Tambah Pakaian</h1>
            </div>

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

            <div className='flex justify-center'>
                <div className='bg-primary/25 px-10 py-10 rounded-xl shadow-xl'>
                    <form onSubmit={handleAddPakaian} className='flex flex-col gap-2'>

                        <div>
                            <select 
                                    value={id_pendaftaran} 
                                    onChange={(e) => setId_pendaftaran(e.target.value)} 
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Pilih Id Pendaftaran</option>
                                    {pelanggans.map((pelanggan) => (
                                        <option key={pelanggan.id_pendaftaran} value={pelanggan.id_pendaftaran}>
                                            id: {pelanggan.id_pendaftaran} {pelanggan.nama}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">Jenis
                                <input type="text" value={jenis_pakaian} onChange={(e) => setJenis_pakaian(e.target.value)} />
                            </label>
                        </div>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">Jumlah
                                <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
                            </label>
                        </div>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">berat
                                <input type="number" value={berat} onChange={(e) => setBerat(e.target.value)} />
                            </label>
                        </div>

                        <div className='btn btn-primary mt-5'>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}

export default addPakaian
