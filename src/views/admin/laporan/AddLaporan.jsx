import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../../components/NavbarAdmin'
import { useNavigate } from 'react-router-dom';
import Api from '../../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../../components/Footer';

export default function AddLaporan() {
    const navigate = useNavigate()

    const [id_user, setid_user] = useState('');
    const [id_pendaftaran, setId_pendaftaran] = useState('');
    const [id_pembayaran, setId_pembayaran] = useState('');
    const [id_pengolahan, setId_pengolahan] = useState('');
    const [id_pengiriman, setId_pengiriman] = useState('');
    const [tanggal_laporan, setTanggal_laporan] = useState('');
    const [keterangan, setKeterangan] = useState('');

    const [validation, setValidation] = useState([]);
    const [users, setUsers] = useState([]);
    const [pelanggans, setPelanggans] = useState([]);
    const [pembayarans, setPembayaran] = useState([]);
    const [pengolahans, setPengolahan] = useState([]);
    const [pengirimans, setPengiriman] = useState([]);

    const handleLaporan = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        await Api.post('/laporan', {
            id_user: id_user,
            id_pendaftaran: id_pendaftaran,
            id_pembayaran: id_pembayaran,
            id_pengolahan: id_pengolahan, 
            id_pengiriman: id_pengiriman, 
            tanggal_laporan: tanggal_laporan, 
            keterangan: keterangan
        })
        .then(() => {
            navigate('/admin/laporan')
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

    const fetchUser = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/user/admin/role');
                setUsers(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the user", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

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

    const fetchPengolahan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pengolahan');
                setPengolahan(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pengolahan", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    const fetchPengiriman = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/pengiriman');
                setPengiriman(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the pengiriman", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchUser();
        fetchPendaftaran();
        fetchPembayaran();
        fetchPengolahan();
        fetchPengiriman();
    }, []);

    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Add Laporan</h1>
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
                    <form onSubmit={handleLaporan} className='flex flex-col gap-2'>
                        <div className='flex gap-5 justify-center'>
                            <div>
                                <select 
                                        value={id_user} 
                                        onChange={(e) => setid_user(e.target.value)} 
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Pilih Admin</option>
                                        {users.map((user) => (
                                            <option key={user.id_user} value={user.id_user}>
                                                id: {user.id_user} {user.username}
                                            </option>
                                        ))}
                                </select>
                            </div>

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
                                <select 
                                        value={id_pembayaran} 
                                        onChange={(e) => setId_pembayaran(e.target.value)} 
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Pilih Id Pembayaran</option>
                                        {pembayarans.map((bayar) => (
                                            <option key={bayar.id_pembayaran} value={bayar.id_pembayaran}>
                                                id: {bayar.id_pembayaran} {bayar.nama}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className='flex gap-5 justify-center mt-3'>
                            <div>
                                <select 
                                        value={id_pengolahan} 
                                        onChange={(e) => setId_pengolahan(e.target.value)} 
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Pilih Id pengolahan</option>
                                        {pengolahans.map((olah) => (
                                            <option key={olah.id_pengolahan} value={olah.id_pengolahan}>
                                                id: {olah.id_pengolahan}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <select 
                                        value={id_pengiriman} 
                                        onChange={(e) => setId_pengiriman(e.target.value)} 
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Pilih Id Pengiriman</option>
                                        {pengirimans.map((kirirm) => (
                                            <option key={kirirm.id_pengiriman} value={kirirm.id_pengiriman}>
                                                id: {kirirm.id_pengiriman} oleh: {kirirm.username} status: {kirirm.status_pengiriman}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                    <input 
                                        type="date" 
                                        value={tanggal_laporan} 
                                        onChange={(e) => setTanggal_laporan(e.target.value)} 
                                        className="input input-bordered w-full" 
                                    />
                            </div>
                        </div>

                        <div className='mt-2'>
                                <textarea 
                                    type="textarea textarea-bordered" 
                                    value={keterangan} 
                                    onChange={(e) => setKeterangan(e.target.value)} 
                                    className="input input-bordered w-full h-40" 
                                    placeholder='Keterangan'
                                />
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
