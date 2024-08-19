import React from 'react'
import NavbarLandingPage from "../../components/NavbarLandingPage.jsx";
import Banner from './homeComponents/Banner.jsx';

function index() {
    return (
        <div>
            <div>
                <NavbarLandingPage />
            </div>
            <div>
                <section>
                    <Banner />
                </section>
            </div>
        </div>
    )
}

export default index
