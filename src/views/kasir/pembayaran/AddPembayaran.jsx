import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarKasir from '../../../components/NavbarKasir';
import Api from '../../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../../components/Footer';

export default function AddPembayaran() {
    const navigate = useNavigate();

    const [id_pendaftaran, setId_pendaftaran] = useState('');
    const [id_user, setId_user] = useState('');
    const [status, setStatus] = useState('');
    const [validation, setValidation] = useState([]);

    const [pendaftarans, setPendaftarans] = useState([]);
    const [kasirs, setKasirs] = useState([]);

    const statusEnums = ['Lunas', 'Belum Lunas'];

    const handleAddPembayaran = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            await Api.post('/pembayaran', {
                id_pendaftaran,
                id_user,
                status
            });
            navigate('/kasir/pembayaran');
        } catch (error) {
            setValidation(error.response.data);
        }
    };

    const fetchPendaftar = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get('/pendaftaran');
            setPendaftarans(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the Pendaftar", error);
        }
    };

    const fetchKasir = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get('/kasir/pendaftaran');
            setKasirs(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the Kasir", error);
        }
    };

    useEffect(() => {
        fetchPendaftar();
        fetchKasir();
    }, []);

    return (
        <div>
            <NavbarKasir />

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Tambah Pembayaran</h1>
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
                    <form onSubmit={handleAddPembayaran} className='flex flex-col gap-2'>
                        <div>
                            <select
                                value={id_pendaftaran}
                                onChange={(e) => setId_pendaftaran(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih Pendaftaran</option>
                                {pendaftarans.map((pendaftaran) => (
                                    <option key={pendaftaran.id_pendaftaran} value={pendaftaran.id_pendaftaran}>
                                        id: {pendaftaran.id_pendaftaran} {pendaftaran.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={id_user}
                                onChange={(e) => setId_user(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih Kasir</option>
                                {kasirs.map((kasir) => (
                                    <option key={kasir.id_user} value={kasir.id_user}>
                                        id: {kasir.id_user} {kasir.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='mt-2'>
                            {statusEnums.map((statusEnum) => (
                                <label key={statusEnum} className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        value={statusEnum}
                                        checked={status === statusEnum}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="radio radio-primary"
                                    />
                                    <span className="ml-2">{statusEnum}</span>
                                </label>
                            ))}
                        </div>

                        <button type="submit" className='btn btn-primary mt-5'>
                            Save
                        </button>
                    </form>
                </div>
            </div>

            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    );
}
