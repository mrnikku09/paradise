import React, { useEffect, useRef, useState } from 'react'
import QuickViewModal from '../Modals/quick_view_modal';
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const Product = () => {
    const [showQuick, setShowQuick] = useState(false);
    const [productData, setproductData] = useState([]);
    const [productImage, setproductImage] = useState([]);
    const [quickModalProductData, setquickModalProductData] = useState(null);
    const [loading, setloading] = useState('');


    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            setloading(false);

            ApiService.fetchData('product').then((res) => {
                if (res.status == "success") {
                    setproductData(res?.productData);
                    setproductImage(res?.PRODUCT_IMAGE_PATH);
                    setloading(true)

                }
            })

        }
        didMountRef.current = false;
    }, [])

    const quickview = (value) => {
        setShowQuick(true);
        setquickModalProductData(value);
    }
    const handlehide = () => {
        setShowQuick(false);
    }


    return (
        <>
            {/* <!-- ======= Portfolio Section ======= --> */}
            <section id="portfolio" className="portfolio">
                <div className="container portfolio-containerr" data-aos="fade-up">
                    <div className="row">
                        <div className="section-title">
                            <h2>Product</h2>
                            <p>Check out our beautiful Product</p>
                        </div>

                    </div>

                    <div className="row" data-aos="fade-up" data-aos-delay="200">
                        {
                            loading == false ? <>
                                <Swiper
                                    spaceBetween={50}
                                    // slidesPerView={3}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                                    540: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 20,
                                                    },
                                                    768: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 40,
                                                    },
                                                    1024: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 50,
                                                    },
                                                }}
                                    >
                                    {[...Array(5)].map((_, index) => (
                                        <>
                                            <SwiperSlide>
                                                {/* <div className="col-lg-4"> */}

                                                <Skeleton baseColor='#f8f8f8' highlightColor="#ebe9e9" height={450}></Skeleton>
                                                {/* </div> */}
                                            </SwiperSlide>
                                        </>
                                    ))}
                                </Swiper>
                            </> :
                                <>
                                    {
                                        productData.length > 0 ? <>
                                            <Swiper
                                                spaceBetween={50}
                                                // slidesPerView={3}
                                                modules={[Autoplay, Pagination, Navigation]}
                                                autoplay={{
                                                    delay: 2500,
                                                    disableOnInteraction: false,
                                                }}
                                                breakpoints={{
                                                    540: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 20,
                                                    },
                                                    768: {
                                                        slidesPerView: 3,
                                                        spaceBetween: 40,
                                                    },
                                                    1024: {
                                                        slidesPerView: 4,
                                                        spaceBetween: 50,
                                                    },
                                                }}

                                            >
                                                {productData.map((value, index) => (
                                                    <>
                                                        <SwiperSlide>
                                                            <div className="portfolio-item filter-app" key={index}>
                                                                <a href={`product/${value.product_slug}`}>
                                                                    <div className="portfolio-wrap">
                                                                        <img src={value?.product_image != '' ? productImage + value?.product_image : constant.DEFAULT_IMAGE} className="img-fluid" alt="" />

                                                                        <div className="portfolio-info">
                                                                            {/* <h4 className='px-3'>{value?.product_name}</h4> */}

                                                                            <a href='javascript:void(0)' onClick={() => quickview(value)} className='quick-view' >
                                                                                Quick View
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </SwiperSlide>
                                                    </>
                                                ))}
                                            </Swiper>
                                        </>
                                            :
                                            ''
                                    }
                                </>
                        }


                        {/* <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                            <a href="/csadmin">
                                <div className="portfolio-wrap">
                                    <img src="assets/img/portfolio/portfolio-1.jpg" className="img-fluid" alt="" />
                                   
                                    <div className="portfolio-info">
                                        <h4>App 1</h4>
                                        <a href='javascript:void(0)' onClick={quickview} className='quick-view' >
                                            Quick View
                                        </a>
                                    </div>
                                </div>
                            </a>
                        </div> */}

                        {/* <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-2.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-2.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="Web 3"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>Web 3</h4>
                                    <p>Web</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-3.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-3.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="App 2"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>App 2</h4>
                                    <p>App</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-4.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-4.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="Card 2"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>Card 2</h4>
                                    <p>Card</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-5.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-5.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="Web 2"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>Web 2</h4>
                                    <p>Web</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-6.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-6.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="App 3"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>App 3</h4>
                                    <p>App</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-7.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-7.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="Card 1"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>Card 1</h4>
                                    <p>Card</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-8.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-8.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="Card 3"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>Card 3</h4>
                                    <p>Card</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                            <div className="portfolio-wrap">
                                <img src="assets/img/portfolio/portfolio-9.jpg" className="img-fluid" alt="" />
                                <div className="portfolio-links">
                                    <a href="assets/img/portfolio/portfolio-9.jpg" data-gallery="portfolioGallery"
                                        className="portfolio-lightbox" title="Web 3"><i className="bi bi-plus"></i></a>
                                    <a href="portfolio-details.html" title="More Details"><i className="bi bi-link"></i></a>
                                </div>
                                <div className="portfolio-info">
                                    <h4>Web 3</h4>
                                    <p>Web</p>
                                </div>
                            </div>
                        </div> */}

                    </div>

                </div>
            </section>
            {/* <!-- End Portfolio Section --> */}
            {/* <div className="modal fade custom-modal product_modal" id="productview" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog product_modal_dialog" role="document">
                    <div className="modal-content product_modal_content">
                        <div className="modal-header product_modal_header">
                            <h5 className="modal-title product_modal_title" id="modalLabel">Product Name</h5>

                        </div>
                        <div className="modal-body product_modal_body">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="product_modal_gallery">
                                        <img src="assets/img/portfolio/portfolio-9.jpg" alt="" className='w-100' />
                                    </div>

                                </div>
                                <div className="col-lg-6 col-12">
                                    <h6>this is name</h6>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}

            {
                showQuick && (<QuickViewModal showmodal={showQuick} handleClose={handlehide} quickModalProductData={quickModalProductData} />)
            }
        </>
    )
}

export default Product