import React, { useState, useEffect } from 'react';
import NavbarKurir from '../../components/NavbarKurir'
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../components/Footer';

export default function EditPengiriman() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [id_pengolahan, setId_pengolahan] = useState('');
    const [id_user, setId_user] = useState('');
    const [tanggal_pengiriman, setTanggal_pengiriman] = useState('');
    const [status_pengiriman, setStatus_pengiriman] = useState('');
    const [validation, setValidation] = useState([]);


    const statusEnums = ['Dalam Pengiriman', 'Diterima'];
    const [kurirs, setKurirs] = useState([]);
    const [pengolahans, setPengolahans] = useState([]);

    const fetchDetailPengiriman = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get(`/pengiriman/${id}`);
            const pengiriman = response.data.data[0];

            if (pengiriman) {
                setId_pengolahan(pengiriman.id_pengolahan || '');
                setId_user(pengiriman.id_user || '');
                setTanggal_pengiriman(pengiriman.tanggal_pengiriman || '');
                setStatus_pengiriman(pengiriman.status_pengiriman || '');
            }
        } catch (error) {
            console.log('Error fetching pengiriman details:', error);
            setValidation(error.response?.data || { message: 'Error fetching pengiriman details' });
        }
    };

    const fetchKurir = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get('/kurir/pengirirman');
            setKurirs(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the Kasir", error);
        }
    };

    const fetchPengolahan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get('/pengolahan');
            setPengolahans(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the Kasir", error);
        }
    };

    useEffect(() => {
        fetchDetailPengiriman();
        fetchKurir();
        fetchPengolahan();
    }, []);

    const updatePengiriman = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            await Api.put(`/pengiriman/${id}`, {
                id_pengolahan: id_pengolahan,
                id_user : id_user, 
                tanggal_pengiriman: tanggal_pengiriman, 
                status_pengiriman: status_pengiriman
            });
            navigate('/kurir/home');
        } catch (error) {
            console.log('Error updating pengiriman:', error);
            setValidation(error.response?.data || { message: 'Error updating pengiriman' });
        }
    };

    return (
        <div>
            <div>
                <NavbarKurir />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Edit Pengiriman</h1>
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
                    <form onSubmit={updatePengiriman} className='flex flex-col gap-2'>

                        <div>
                            <select
                                value={id_pengolahan}
                                onChange={(e) => setId_pengolahan(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                {pengolahans.map((olah) => (
                                    <option key={olah.id_pengolahan} value={olah.id_pengolahan}>
                                        id: {olah.id_pengolahan}
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
                                {kurirs.map((kurir) => (
                                    <option key={kurir.id_user} value={kurir.id_user}>
                                        id: {kurir.id_user} {kurir.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='mt-2'>
                            <input
                                type="date"
                                value={tanggal_pengiriman}
                                onChange={(e) => setTanggal_pengiriman(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className='mt-2'>
                            {statusEnums.map((statusEnum) => (
                                <label key={statusEnum} className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        value={statusEnum}
                                        checked={status_pengiriman === statusEnum}
                                        onChange={(e) => setStatus_pengiriman(e.target.value)}
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

            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}
