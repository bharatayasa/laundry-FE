import React from 'react'
import NavbarPengolahan from '../../components/NavbarPengolahan'
import MasterPakaian from '../kasir/pakaian/MasterPakaian'

export default function PengolahanPakaian() {
    return (
        <div>
            <div>
                <NavbarPengolahan />
            </div>
            <div>
                <MasterPakaian />
            </div>
        </div>
    )
}
