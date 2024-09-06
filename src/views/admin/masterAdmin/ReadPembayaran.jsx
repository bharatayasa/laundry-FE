import React from 'react'
import NavbarAdmin from '../../../components/NavbarAdmin'
import PembayaranMaster from '../../kasir/pembayaran/PembayaranMaster'

export default function ReadePembayaran() {
    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>
            <div>
                <PembayaranMaster />
            </div>
        </div>
    )
}
