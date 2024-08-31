import React from 'react'
import NavbarKurir from '../../components/NavbarKurir'
import PakaianGlobal from '../kasir/pakaian/MasterPakaian'

export default function PakaianKurir() {
    return (
        <div>
            <div>
                <NavbarKurir />
            </div>

            <div>
                <PakaianGlobal />
            </div>
        </div>
    )
}
