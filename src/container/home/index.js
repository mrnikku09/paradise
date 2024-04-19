import React, { useEffect, useRef, useState } from 'react'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';
import Homeslider from '../../Components/Elements/home_slider';
import Header from '../../Components/Header';
import Servicesection from '../../Components/Elements/home_service_section';
import Product from '../../Components/Elements/home_product';
import Faq from '../../Components/Elements/home_faq';
import Team from '../../Components/Elements/home_team';
import Testimonials from '../../Components/Elements/home_testimonials';
import Contactus from '../../Components/Elements/home_contactus';
import Footer from '../../Components/Footer';

const Home = () => {

    return (
        <>
            <Header />
            <main id="main">
            <Homeslider />
            <Servicesection/>
            <Product/>
            <Faq/>
            <Team/>
            {/* <Testimonials/> */}
            <Contactus/>
            
            </main>
            <Footer/>        


        </>
    )
}

export default Home