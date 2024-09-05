import React from 'react'
import Footer from '../../../components/Footer'
import image from '../../../assets/laundry.jpeg'
import { Link } from 'react-router-dom'

function Banner() {
    return (
        <div className='-mt-20'>
            <div
                className="hero min-h-screen"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                        backgroundBlendMode: 'darken'
                    }}>

                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-primary text-5xl font-bold">Sistem Informasi Laundry</h1>
                        <p className="mb-5 text-wrap mx-1">
                        Sistem Informasi Laundry adalah platform yang membantu mengelola operasional laundry, termasuk pendaftaran pelanggan, pengolahan pakaian, pencatatan pembayaran, dan laporan transaksi. Sistem ini dirancang untuk meningkatkan efisiensi dan layanan kepada pelanggan.
                        </p>
                        <Link to={'/login'}>
                            <button className="btn btn-primary">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Banner
