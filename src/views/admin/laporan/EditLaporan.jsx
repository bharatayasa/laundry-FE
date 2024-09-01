import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Api from '../../../service/api';
import NavbarAdmin from '../../../components/NavbarAdmin';
import Footer from '../../../components/Footer';

export default function EditLaporan() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [id_user, setId_user] = useState('');
    const [id_pendaftaran, setId_pendaftaran] = useState('');
    const [id_pembayaran, setId_pembayaran] = useState('');
    const [id_pengolahan, setId_pengolahan] = useState('');
    const [id_pengiriman, setId_pengiriman] = useState('');
    const [tanggal_laporan, setTanggal_laporan] = useState('');
    const [keterangan, setKeterangan] = useState('');

    const [validation, setValidation] = useState([]);
    const [users, setUsers] = useState([]);
    const [pelanggans, setPelanggans] = useState([]);
    const [pembayarans, setPembayarans] = useState([]);
    const [pengolahans, setPengolahans] = useState([]);
    const [pengirimans, setPengirimans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDetailLaporan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get(`/laporan/${id}`);
            const laporan = response.data.data[0];

            console.log('Laporan yang diterima:', laporan);

            // Set values to state, ensuring fallback values
            setId_user(laporan.id_user || '');
            setId_pendaftaran(laporan.id_pendaftaran || '');
            setId_pembayaran(laporan.id_pembayaran || '');
            setId_pengolahan(laporan.id_pengolahan || '');
            setId_pengiriman(laporan.id_pengiriman || '');
            setTanggal_laporan(laporan.tanggal_laporan || '');
            setKeterangan(laporan.keterangan || '');
        } catch (error) {
            console.error("There was an error fetching the laporan details", error);
            setValidation(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const fetchOptions = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const [userResponse, pendaftaranResponse, pembayaranResponse, pengolahanResponse, pengirimanResponse] = await Promise.all([
                Api.get('/user/admin/role'),
                Api.get('/pendaftaran'),
                Api.get('/pembayaran'),
                Api.get('/pengolahan'),
                Api.get('/pengiriman'),
            ]);

            setUsers(userResponse.data.data);
            setPelanggans(pendaftaranResponse.data.data);
            setPembayarans(pembayaranResponse.data.data);
            setPengolahans(pengolahanResponse.data.data);
            setPengirimans(pengirimanResponse.data.data);
        } catch (error) {
            console.error("There was an error fetching the form options", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchDetailLaporan(), fetchOptions()]);
        };
        fetchData();
    }, [id]);

    const updateLaporan = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            await Api.put(`/laporan/${id}`, {
                id_user,
                id_pendaftaran,
                id_pembayaran,
                id_pengolahan,
                id_pengiriman,
                tanggal_laporan,
                keterangan
            });
            navigate('/admin/laporan');
        } catch (error) {
            setValidation(error.response.data);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavbarAdmin />

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Update Laporan</h1>
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
                    <form onSubmit={updateLaporan} className='flex flex-col gap-2'>
                        <div className='flex gap-5 justify-center'>
                            <select 
                                value={id_user} 
                                onChange={(e) => setId_user(e.target.value)} 
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih User</option>
                                {users.map((user) => (
                                    <option key={user.id_user} value={user.id_user}>
                                        id: {user.id_user} {user.username}
                                    </option>
                                ))}
                            </select>

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

                        <div className='flex gap-5 justify-center mt-3'>
                            <select 
                                value={id_pengolahan} 
                                onChange={(e) => setId_pengolahan(e.target.value)} 
                                className="select select-bordered w-full"
                            >
                                <option value="">Pilih Id Pengolahan</option>
                                {pengolahans.map((olah) => (
                                    <option key={olah.id_pengolahan} value={olah.id_pengolahan}>
                                        id: {olah.id_pengolahan}
                                    </option>
                                ))}
                            </select>

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

                            <input 
                                type="date" 
                                value={tanggal_laporan} 
                                onChange={(e) => setTanggal_laporan(e.target.value)} 
                                className="input input-bordered w-full" 
                            />
                        </div>

                        <div className='mt-2'>
                            <textarea 
                                value={keterangan} 
                                onChange={(e) => setKeterangan(e.target.value)} 
                                className="textarea textarea-bordered w-full h-40" 
                                placeholder='Keterangan'
                            />
                        </div>

                        <div className='btn btn-primary mt-5'>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
