import React, { useEffect, useRef, useState } from 'react'
import QuickViewModal from '../Modals/quick_view_modal';
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const Homecategorywiseproduct = () => {

    const [showQuick, setShowQuick] = useState(false);
    const [quickModalProductData, setquickModalProductData] = useState(null);
    const [productData, setproductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [productImage, setproductImage] = useState([]);
    const [loading, setloading] = useState('');
    const [loading2, setloading2] = useState(false);


    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            setloading(false);

            ApiService.fetchData('category-wise-product').then((res) => {
                if (res.status == "success") {
                    setCategoryData(res?.categoryData)
                    setproductData(res?.categoryData?.product);
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

            <section id="portfolio" className="portfolio pb-0">
                <div className="container portfolio-containerr" >
                    <div className="row">
                        <div className="section-title">
                            <h2>Category Wise Product</h2>
                            <p>Check out our beautiful Product</p>
                        </div>

                    </div>

                    {
                        categoryData.length > 0 ? <>
                            {
                                categoryData.map((value, index) => {
                                    return <>
                                        <div className="row mb-3">
                                            <div className="col-lg-12">
                                                <h4 className='text-center'>
                                                    {value?.cat_name}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="row mb-5 mx-1">
                                            {
                                                loading == false ? <>
                                                    <Swiper
                                                        spaceBetween={30}
                                                        // slidesPerView={3}
                                                        modules={[Autoplay, Pagination, Navigation]}
                                                        autoplay={{
                                                            delay: 2000,
                                                            disableOnInteraction: false,
                                                        }}
                                                        breakpoints={{
                                                            0: {
                                                        slidesPerView: 2,
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

                                                                    <Skeleton height={300}></Skeleton>
                                                                    {/* </div> */}
                                                                </SwiperSlide>
                                                            </>
                                                        ))}
                                                    </Swiper>
                                                </> :
                                                    <>
                                                        {
                                                            value?.product.length > 0 ? <>
                                                                <Swiper
                                                                    // spaceBetween={50}
                                                                    // slidesPerView={3}
                                                                    modules={[Autoplay, Pagination, Navigation]}
                                                                    autoplay={{
                                                                        delay: 2000,
                                                                        disableOnInteraction: false,
                                                                    }}
                                                                    breakpoints={{
                                                                        0: {
                                                        slidesPerView: 2,
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
                                                                    {value?.product.map((value, index) => (
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




                                        </div>
                                    </>
                                })
                            }

                        </>
                            : <>
                                {[...Array(3)].map((_, index) => (
                                    <>
                                        <Swiper
                                            spaceBetween={30}
                                            // slidesPerView={3}
                                           
                                            modules={[Autoplay, Pagination, Navigation]}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            breakpoints={{
                                                0: {
                                                    slidesPerView: 2,
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
                                                    <SwiperSlide className='mb-5'>
                                                        {/* <div className="col-lg-4"> */}

                                                        <Skeleton height={300}></Skeleton>
                                                        {/* </div> */}
                                                    </SwiperSlide>
                                                </>
                                            ))}
                                        </Swiper>

                                    </>
                                ))}
                            </>
                    }


                </div>
            </section>
            {
                showQuick && (<QuickViewModal showmodal={showQuick} handleClose={handlehide} quickModalProductData={quickModalProductData} />)
            }

        </>
    )
}

export default Homecategorywiseproduct