import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarPengolahan from '../../components/NavbarPengolahan';
import Api from '../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../components/Footer';

export default function AddPengolahan() {
    const navigate = useNavigate();

    const [id_pakaian, setId_pakaian] = useState('');
    const [status_cuci, setStatus_cuci] = useState('');
    const [status_kering, setStatus_kering] = useState('');
    const [status_setrika, setStatus_setrika] = useState('');
    const [tanggal_mulai, setTanggal_mulai] = useState('');
    const [tanggal_selesai, setTanggal_selesai] = useState('');

    const [validation, setValidation] = useState([]);
    const [pakaians, setPakaian] = useState([]);

    const statusCuciEnum = ['Selesai', 'Belum'];

    const handlePengolahan = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            await Api.post('/pengolahan', {
                id_pakaian, 
                status_cuci, 
                status_kering,
                status_setrika, 
                tanggal_mulai, 
                tanggal_selesai
            })

            navigate('/pengolahan/home');
        } catch (error) {
            setValidation(error.response.data);
        }
    };

    const fetchPakaian = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get('/pakaian');
            setPakaian(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the Pakaian", error);
        }
    };

    useEffect(() => {
        fetchPakaian();
    }, []);

    return (
        <div>
            <div>
                <NavbarPengolahan />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Tambah Pengolahan</h1>
            </div>

            {validation.errors && (
                <div>
                    {validation.errors.map((error, index) => (
                        <p key={index}>{error.path} : {error.msg}</p>
                    ))}
                </div>
            )}

            <div className='flex justify-center'>
                <div className='bg-primary/25 px-10 py-10 rounded-xl shadow-xl'>
                    <form onSubmit={handlePengolahan} className='flex flex-col gap-2'>

                        <div className='flex gap-5 justify-center'>
                            <div className='mt-2'>
                                <label className='block mb-1 font-semibold text-center'>Pilih Pelanggan</label>
                                <select
                                    value={id_pakaian}
                                    onChange={(e) => setId_pakaian(e.target.value)}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Pilih Pakaian</option>
                                    {pakaians.map((pakaian) => (
                                        <option key={pakaian.id_pakaian} value={pakaian.id_pakaian}>
                                            id: {pakaian.id_pakaian} {pakaian.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='mt-2'>
                                <label className='block mb-1 font-semibold text-center'>Tanggal Mulai</label>
                                <input 
                                    type="date" 
                                    value={tanggal_mulai} 
                                    onChange={(e) => setTanggal_mulai(e.target.value)} 
                                    className="input input-bordered w-full" 
                                />
                            </div>

                            <div className='mt-2'>
                                <label className='block mb-1 font-semibold text-center'>Tanggal Selesai</label>
                                <input 
                                    type="date" 
                                    value={tanggal_selesai} 
                                    onChange={(e) => setTanggal_selesai(e.target.value)} 
                                    className="input input-bordered w-full" 
                                />
                            </div>
                        </div>

                        <div className='flex gap-5'>
                            <div className='mt-2 bg-primary/20 shadow-lg rounded-md px-5 py-2'>
                                <div className='text-center mb-3 font-semibold'>
                                    Status Cuci
                                </div>
                                {statusCuciEnum.map((status) => (
                                    <label key={status} className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            value={status}
                                            checked={status_cuci === status}
                                            onChange={(e) => setStatus_cuci(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <span className="ml-2">{status}</span>
                                    </label>
                                ))}
                            </div>

                            <div className='mt-2 bg-primary/20 shadow-lg rounded-md px-5 py-2'>
                                <div className='text-center mb-3 font-semibold'>
                                    Status Kering
                                </div>
                                {statusCuciEnum.map((status) => (
                                    <label key={status} className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            value={status}
                                            checked={status_kering === status}
                                            onChange={(e) => setStatus_kering(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <span className="ml-2">{status}</span>
                                    </label>
                                ))}
                            </div>

                            <div className='mt-2 bg-primary/20 shadow-lg rounded-md px-5 py-2'>
                                <div className='text-center mb-3 font-semibold'>
                                    Status Setrika
                                </div>
                                {statusCuciEnum.map((status) => (
                                    <label key={status} className="inline-flex items-center mr-4">
                                        <input
                                            type="radio"
                                            value={status}
                                            checked={status_setrika === status}
                                            onChange={(e) => setStatus_setrika(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <span className="ml-2">{status}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className='btn btn-primary mt-5'>
                            Save
                        </button>
                    </form>
                </div>
            </div>

            <div className='mt-5'>
                <Footer />
            </div>

        </div>
    );
}
