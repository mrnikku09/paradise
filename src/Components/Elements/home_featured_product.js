import React, { useEffect, useRef, useState } from 'react'
import QuickViewModal from '../Modals/quick_view_modal';
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const Featuredproduct = () => {
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
                    setproductData(res?.featuredProduct);
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
                <div className="container portfolio-containerr" >
                    <div className="row">
                        <div className="section-title">
                            <h2>Featured Product</h2>
                            <p>Check out our beautiful Product</p>
                        </div>

                    </div>

                    <div className="row">
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
                                        0: {
                                            slidesPerView: 1,
                                        }, 540: {
                                            slidesPerView: 2,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                        },
                                        1200: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {[...Array(5)].map((_, index) => (
                                        <>
                                            <SwiperSlide>
                                                {/* <div className="col-lg-4"> */}

                                                <Skeleton height={400}></Skeleton>
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
                                                // spaceBetween={50}
                                                // slidesPerView={3}
                                                modules={[Autoplay, Pagination, Navigation]}
                                                // autoplay={{
                                                //     delay: 2500,
                                                //     disableOnInteraction: false,
                                                // }}
                                                breakpoints={{
                                                    0: {
                                                        slidesPerView: 1,
                                                    }, 540: {
                                                        slidesPerView: 2,
                                                    },
                                                    768: {
                                                        slidesPerView: 2,
                                                    },
                                                    1024: {
                                                        slidesPerView: 3,
                                                    },
                                                    1200: {
                                                        slidesPerView: 4,
                                                    },
                                                }}

                                            >
                                                {productData.map((value, index) => (
                                                    <>
                                                        <SwiperSlide className='px-3'>
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

                                                            <div class="card-information">
                                                                <div class="card-information__wrapper">
                                                                    <div class="caption-with-letter-spacing subtitle mb-1">{value?.product_category_name}
                                                                    </div><h3 class="card__title "><a class="full-unstyled-link" href={`product/${value.product_slug}`} title="BCAA+EAA - watermelon">{value?.product_name}</a></h3>
                                                                    <div class="price  price--on-sale ">
                                                                        <dl>
                                                                            <div class="price__sale">
                                                                                <dt>
                                                                                    <span class="visually-hidden visually-hidden--inline">Sale price</span>
                                                                                </dt>
                                                                                <dd>
                                                                                    <span class="price-item price-item--sale">₹{value?.product_selling_price}</span>
                                                                                </dd><dt class="price__compare">
                                                                                    <span class="visually-hidden visually-hidden--inline">Regular price</span>
                                                                                </dt>
                                                                                <dd class="price__compare">
                                                                                    <span class="price-item price-item--regular"><del>₹{value?.product_price}</del></span>
                                                                                </dd>
                                                                                <dt class="price__compare">
                                                                                    <span class="visually-hidden visually-hidden--inline">Discount price</span>
                                                                                </dt>
                                                                                <dd class="price__dis">
                                                                                    <span class="product_discount">{Math.floor(((value?.product_price - value?.product_selling_price) * 100) / value?.product_price)}%</span>
                                                                                </dd>
                                                                                <dd class="card__badge">

                                                                                </dd></div><dl class="unit-price caption hidden"><dt class="visually-hidden">Unit price
                                                                                </dt>
                                                                                <dd>
                                                                                    <span></span>
                                                                                    <span aria-hidden="true"></span>
                                                                                    <span class="visually-hidden">&nbsp;per&nbsp;</span>
                                                                                    <span>

                                                                                    </span>
                                                                                </dd>
                                                                            </dl>
                                                                        </dl>
                                                                    </div>
                                                                </div>
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
                    <hr />
                    <div className="row mt-3 text-center" style={{ fontSize: '16px', fontWeight: '600' }}>
                        <div className="section-title">
                            <a href="/product">
                                <p>See All</p>
                            </a>
                        </div>
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

export default Featuredproduct