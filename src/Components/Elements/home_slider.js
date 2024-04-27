import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'




const Homeslider = () => {


    const [sliderData, setsliderData] = useState([]);
    const [slider_image_path, setslider_image_path] = useState('');
    const [loading, setloading] = useState('');

    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            setloading(false);
            ApiService.fetchData('slider-banner').then((res) => {
                if (res.status == "success") {
                    setsliderData(res?.sliderData);
                    setslider_image_path(res?.SLIDER_IMAGE_PATH);
                    setloading(true)
                }
            })

        }
        didMountRef.current = false;
    }, [])
    return (
        <>
            {/* <!-- ======= Hero Section ======= --> */}
            <section id="hero" className="d-flex align-items-center">
        {
            loading ==false ? <>
                <Skeleton style={{width:'100vw'}} height={500}></Skeleton>
            </>:
            <>
            <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}>

                    {
                        sliderData.length > 0 ?
                            sliderData.map((value, index) => (
                                value.slider_position == 1 ?
                                    <>
                                        <SwiperSlide>
                                            <div className="container-fluid" key={index}>
                                                <div className="row gy-4">

                                                    <div className="col-lg-12 order-1 order-lg-2 hero-img">
                                                        <img src={value.slider_image != '' ? slider_image_path + value.slider_image : constant.DEFAULT_IMAGE} className="w-100 animated" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </> : ''
                            ))
                            : ''
                    }
                    {/* <SwiperSlide>
                        <div className="container">
                            <div className="row gy-4">
                                <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" className="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" className="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="container">
                            <div className="row gy-4">
                                <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" className="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" className="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="container">
                            <div className="row gy-4">
                                <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" className="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" className="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="container">
                            <div className="row gy-4">
                                <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" className="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div className="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" className="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>

                    </SwiperSlide> */}
                </Swiper>
            </>
        }
                
            </section>
            {/* <!-- End Hero --> */}
        </>
    )
}

export default Homeslider