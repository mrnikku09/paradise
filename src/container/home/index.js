import React, { useEffect, useRef, useState } from 'react'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';
import Homeslider from '../../Components/Elements/home_slider';
import Header from '../../Components/Header';
import Servicesection from '../../Components/Elements/home_service_section';
import Faq from '../../Components/Elements/home_faq';
import Team from '../../Components/Elements/home_team';
import Testimonials from '../../Components/Elements/home_testimonials';
import Contactus from '../../Components/Elements/home_contactus';
import Footer from '../../Components/Footer';
import Featuredproduct from '../../Components/Elements/home_featured_product';
import Newsletter from '../../Components/Elements/home_newsletter';
import Homecategorywiseproduct from '../../Components/Elements/home_category_wise_product';

const Home = () => {


    return (
        <>
            <Header />
            <main id="main">
            <Homeslider />
            <Featuredproduct/>
            {/* <Servicesection/> */}
            <Homecategorywiseproduct/>
            <Faq/>
            <Team/>
            {/* <Testimonials/> */}
            {/* <Contactus/> */}
            
            </main>
            <Newsletter/>
            <Footer/>        


        </>
    )
}

export default Home