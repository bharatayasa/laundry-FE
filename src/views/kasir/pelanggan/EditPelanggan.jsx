import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarKasir from '../../../components/NavbarKasir'
import Api from '../../../service/api';
import Cookies from 'js-cookie';

function EditPelanggan() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nama, setNama] = useState(''); 
    const [alamat, setAlamat] = useState(''); 
    const [no_telepon, setNo_telepon] = useState(''); 
    const [email, setEmail] = useState(''); 

    const [validation, setValidation] = useState([]);

    const fetchDetailPelanggan = async () => {
        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            const response = await Api.get(`/pelanggan/${id}`);
            const pelanggan = response.data.data[0];

            setNama(pelanggan.nama);
            setAlamat(pelanggan.alamat);
            setNo_telepon(pelanggan.no_telepon);
            setEmail(pelanggan.email);
        } catch (error) {
            console.log('Error:', error);
            setValidation(error.response.data);
        }
    }

    useEffect(() => {
        fetchDetailPelanggan();
    }, []);

    const UpdatePelanggan = async (e) => {
        e.preventDefault();

        const token = Cookies.get('token');
        Api.defaults.headers.common['Authorization'] = token;

        try {
            await Api.put(`/pelanggan/edit/${id}`, {
                nama: nama, 
                alamat: alamat, 
                no_telepon: no_telepon, 
                email: email
            });
            navigate('/kasir/home');
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
                <h1 className='text-2xl my-2 mx-2 font-semibold'>Update Pelanggan</h1>
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
                    <form onSubmit={UpdatePelanggan} className='flex flex-col gap-2'>
                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">
                                Nama
                                <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
                            </label>
                        </div>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">
                                Alamat
                                <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                            </label>
                        </div>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">
                                No Telp
                                <input type="number" value={no_telepon} onChange={(e) => setNo_telepon(e.target.value)} />
                            </label>
                        </div>

                        <div>
                            <label className="input input-bordered flex items-center gap-2 font-semibold">
                                E-Mail
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>
                        </div>

                        <div className='btn btn-primary mt-5'>
                            <button type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPelanggan;
