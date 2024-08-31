import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarKasir from '../../../components/NavbarKasir';
import Api from '../../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../../components/Footer';

export default function EditPembayaran() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [id_pendaftaran, setId_pendaftaran] = useState('');
    const [id_user, setId_user] = useState('');
    const [status, setStatus] = useState('');

    const [validation, setValidation] = useState([]);

    const [pendaftarans, setPendaftarans] = useState([]);
    const [kasirs, setKasirs] = useState([]);

    const statusEnums = ['Lunas', 'Belum Lunas'];

    const fetchDetailPembayaran = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get(`/pembayaran/${id}`);
            const pembayaran = response.data.data;

            if (pembayaran) {
                setId_pendaftaran(pembayaran.id_pendaftaran || '');
                setId_user(pembayaran.id_user || '');
                setStatus(pembayaran.status || '');
            }
        } catch (error) {
            console.log('Error fetching pembayaran details:', error);
            setValidation(error.response?.data || { message: 'Error fetching pembayaran details' });
        }
    };

    const fetchPendaftar = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get('/pendaftaran');
            setPendaftarans(response.data.data || []);
        } catch (error) {
            console.error("Error fetching Pendaftar:", error);
        }
    };

    const fetchKasir = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get('/kasir/pendaftaran');
            setKasirs(response.data.data || []);
        } catch (error) {
            console.error("Error fetching Kasir:", error);
        }
    };

    useEffect(() => {
        fetchDetailPembayaran();
        fetchPendaftar();
        fetchKasir();
    }, []);

    const updatePembayaran = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            await Api.put(`/pembayaran/${id}`, {
                id_pendaftaran: id_pendaftaran,
                id_user: id_user, 
                status: status
            });
            navigate('/kasir/pembayaran');
        } catch (error) {
            console.log('Error updating pembayaran:', error);
            setValidation(error.response?.data || { message: 'Error updating pembayaran' });
        }
    };

    return (
        <div>
            <div>
                <NavbarKasir />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Edit Pembayaran</h1>
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
                    <form onSubmit={updatePembayaran} className='flex flex-col gap-2'>
                        <div>
                            <select
                                value={id_pendaftaran}
                                onChange={(e) => setId_pendaftaran(e.target.value)}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Pilih Pendaftaran</option>
                                {pendaftarans.map((pendaftaran) => (
                                    <option key={pendaftaran.id_pendaftaran} value={pendaftaran.id_pendaftaran}>
                                        ID: {pendaftaran.id_pendaftaran} - {pendaftaran.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={id_user}
                                onChange={(e) => setId_user(e.target.value)}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Pilih Kasir</option>
                                {kasirs.map((kasir) => (
                                    <option key={kasir.id_user} value={kasir.id_user}>
                                        ID: {kasir.id_user} - {kasir.username}
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
                                        required
                                    />
                                    <span className="ml-2">{statusEnum}</span>
                                </label>
                            ))}
                        </div>

                        {validation.message && (
                            <div className="text-red-500 text-sm mt-2">
                                {validation.message}
                            </div>
                        )}

                        <button type="submit" className='btn btn-primary mt-5'>
                            Save
                        </button>
                    </form>
                </div>
            </div>

            <div className='mt-11'>
                <Footer />
            </div>
        </div>
    )
}
