import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarKasir from '../../../components/NavbarKasir'
import Api from '../../../service/api';
import Cookies from 'js-cookie';
import Footer from '../../../components/Footer';

function AddPendaftaran() {
    const navigate = useNavigate()

    const [id_pelanggan, setId_pelanggan] = useState('');
    const [id_user, setId_user] = useState('');

    const [validation, setValidation] = useState([]);

    const [pelanggans, setPelanggans] = useState([]);
    const [kasisrs, setKasirs] = useState([]);

    const handleAddPendaftaran = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        await Api.post('/pendaftaran', {
            id_pelanggan: id_pelanggan, 
            id_user: id_user
        })
        .then(() => {
            navigate('/kasir/pendaftaran')
        })
        .catch( error => {
            setValidation(error.response.data);
        })
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
        fetchPelanggan();
        fetchKasir();
    }, []);

    return (
        <div>
            <div>
                <NavbarKasir />
            </div>

            <div className='flex justify-center'>
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Tambah Pendaftaran</h1>
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
                    <form onSubmit={handleAddPendaftaran} className='flex flex-col gap-2'>

                        <div>
                            <select 
                                    value={id_pelanggan} 
                                    onChange={(e) => setId_pelanggan(e.target.value)} 
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Pilih Id Pelanggan</option>
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
                                    <option value="">Pilih Kasir</option>
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

export default AddPendaftaran
