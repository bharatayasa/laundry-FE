import React from 'react'
import NavbarAdmin from '../../../components/NavbarAdmin'
import PengolahanMaster from '../../pengolahan/PengolahanMaster'

export default function ReadePengolahan() {
    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>
            <div>
                <PengolahanMaster />
            </div>
        </div>
    )
}
