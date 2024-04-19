import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const Homeslider = () => {
    return (
        <>
            {/* <!-- ======= Hero Section ======= --> */}
            <section id="hero" class="d-flex align-items-center">

                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <div class="container">
                            <div class="row gy-4">
                                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" class="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div class="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" class="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="container">
                            <div class="row gy-4">
                                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" class="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div class="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" class="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="container">
                            <div class="row gy-4">
                                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" class="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div class="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" class="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="container">
                            <div class="row gy-4">
                                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                                    <h1>Bettter digital experience with Paradise</h1>
                                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                                    <div>
                                        <a href="#about" class="btn-get-started scrollto">Get Started</a>
                                    </div>
                                </div>
                                <div class="col-lg-6 order-1 order-lg-2 hero-img">
                                    <img src="assets/img/hero-img.svg" class="img-fluid animated" alt="" />
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>
                </Swiper>
            </section>
            {/* <!-- End Hero --> */}
        </>
    )
}

export default Homeslider