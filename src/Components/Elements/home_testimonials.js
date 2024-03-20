import React from 'react'

const Testimonials = () => {
    return (
        <>
            {/* <!-- ======= Clients Section ======= --> */}
            <section id="clients" class="clients section-bg">
                <div class="container" data-aos="fade-up">

                    <div class="section-title">
                        <h2>Clients</h2>
                        <p>They trusted us</p>
                    </div>

                    <div class="clients-slider swiper" data-aos="fade-up" data-aos-delay="100">
                        <div class="swiper-wrapper align-items-center">
                            <div class="swiper-slide"><img src="assets/img/clients/client-1.png" class="img-fluid" alt="" /></div>
                            <div class="swiper-slide"><img src="assets/img/clients/client-2.png" class="img-fluid" alt="" /></div>
                            <div class="swiper-slide"><img src="assets/img/clients/client-3.png" class="img-fluid" alt="" /></div>
                            <div class="swiper-slide"><img src="assets/img/clients/client-4.png" class="img-fluid" alt="" /></div>
                            <div class="swiper-slide"><img src="assets/img/clients/client-5.png" class="img-fluid" alt="" /></div>
                            <div class="swiper-slide"><img src="assets/img/clients/client-6.png" class="img-fluid" alt="" /></div>
                            <div class="swiper-slide"><img src="assets/img/clients/client-7.png" class="img-fluid" alt="" /></div>
                            <div class="swiper-slide"><img src="assets/img/clients/client-8.png" class="img-fluid" alt="" /></div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>

                </div>
            </section>
            {/* <!-- End Clients Section --> */}
        </>
    )
}

export default Testimonials