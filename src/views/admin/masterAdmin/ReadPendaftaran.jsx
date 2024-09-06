import React from 'react'
import NavbarAdmin from '../../../components/NavbarAdmin'
import PendaftaranMaster from '../../kasir/pendaftaran/PendaftaranMaster'

export default function ReadPendaftaran() {
    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>
            <div>
                <PendaftaranMaster />
            </div>
        </div>
    )
}
