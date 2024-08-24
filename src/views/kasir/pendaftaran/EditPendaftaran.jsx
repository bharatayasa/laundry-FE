import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarKasir from '../../../components/NavbarKasir'
import Api from '../../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../../components/Footer';

export default function EditPendaftaran() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [id_pelanggan, setId_pelanggan] = useState('');
    const [id_user, setId_user] = useState('');

    const [validation, setValidation] = useState([]);

    const [pelanggans, setPelanggans] = useState([]);
    const [kasisrs, setKasirs] = useState([]);

    const fetchDetailPelanggan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get(`/pendaftaran/${id}`);
            const pelanggan = response.data.data[0];

            setId_pelanggan(pelanggan.id_pelanggan);
            setId_user(pelanggan.id_user);
        } catch (error) {
            console.log('Error:', error);
            setValidation(error.response.data);
        }
    }

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

    const fetchKasir = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        if (token) {
            try {
                const response = await Api.get('/kasir/pendaftaran');
                setKasirs(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the Kasir", error);
            }
        } else {
            console.error("Token is not available!");
        }
    };

    useEffect(() => {
        fetchDetailPelanggan();
        fetchPelanggan();
        fetchKasir();
    }, []);

    const UpdatePelanggan = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            await Api.put(`/pendaftaran/${id}`, {
                id_pelanggan: id_pelanggan,
                id_user:id_user
            });
            navigate('/kasir/pendaftaran');
        } catch (error) {
            setValidation(error.response.data);
        }
    }

    return (
        <div>
            <div>
                <NavbarKasir />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Edit Pendaftaran</h1>
            </div>

            <div className='flex justify-center'>
                <div className='bg-primary/25 px-10 py-10 rounded-xl shadow-xl'>
                    <form onSubmit={UpdatePelanggan} className='flex flex-col gap-2'>

                        <div>
                            <select 
                                    value={id_pelanggan} 
                                    onChange={(e) => setId_pelanggan(e.target.value)} 
                                    className="select select-bordered w-full"
                                >
                                    {pelanggans.map((pelanggan) => (
                                        <option key={pelanggan.id_pelanggan} value={pelanggan.id_pelanggan}>
                                            id: {pelanggan.id_pelanggan} {pelanggan.nama}
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
                                    {kasisrs.map((kasir) => (
                                        <option key={kasir.id_user} value={kasir.id_user}>
                                            id: {kasir.id_user} {kasir.username}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className='btn btn-primary mt-5'>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='mt-24'>
                <Footer />
            </div>
        </div>
    )
}
