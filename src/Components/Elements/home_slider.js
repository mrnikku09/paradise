import React from 'react'

const Homeslider = () => {
    return (
        <>
            {/* <!-- ======= Hero Section ======= --> */}
            <section id="hero" class="d-flex align-items-center">
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

            </section>
            {/* <!-- End Hero --> */}
        </>
    )
}

export default Homeslider