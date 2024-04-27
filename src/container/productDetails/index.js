import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { ApiService } from '../../Components/Services/apiservices'
import { useParams } from 'react-router-dom'
import constant from '../../Components/Services/constant'
import Skeleton from 'react-loading-skeleton'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import QuickViewModal from '../../Components/Modals/quick_view_modal'
import Toasts from '../../Components/Extension/Toast/Toasts';

import { ToastContainer } from 'react-toastify'

const ProductDetails = () => {

    const [productData, setproductData] = useState('')
    const [relproductData, setrelproductData] = useState([])
    const [product_image, setproductImage] = useState('')
    // const [addToCart, setaddToCart] = useState('')
    const [loading, setloading] = useState(false);
    const [loading2, setloading2] = useState(false);
    const [showQuick, setShowQuick] = useState(false);
    const [quickModalProductData, setquickModalProductData] = useState(null);



    const didMountRef = useRef(true)
    const { slug } = useParams();

    useEffect(() => {
        if (didMountRef.current) {
            getproductdetails();

        }
        didMountRef.current = false
    }, [])

    let mrpprice = 0;
    let sellprice = 0;
    let discount = 0;
    const [productdiscount, setproductdiscount] = useState(0)
    const getproductdetails = () => {
        const dataString = {
            'product_slug': slug
        }
        ApiService.postData('product-details', dataString).then((res) => {
            if (res.status === 'success') {
                setloading(true)
                setloading2(true)

                setproductData(res?.productDetails)
                setrelproductData(res?.relProduct)
                setproductImage(res?.PRODUCT_IMAGE_PATH)
                mrpprice = parseFloat(res?.productDetails?.product_price)
                sellprice = parseFloat(res?.productDetails?.product_selling_price)
                console.log(mrpprice)
                console.log(sellprice)
                if (!isNaN(mrpprice) && !isNaN(sellprice)) {
                    discount = ((mrpprice - sellprice) * 100) / mrpprice
                    console.log(discount);
                    discount = Math.floor(discount)
                    setproductdiscount(discount);
                }
            }
        })
    }

    const quickview = (value) => {
        setShowQuick(true);
        setquickModalProductData(value);
    }
    const handlehide = () => {
        setShowQuick(false);
    }

    // product quantity
    const [productQuantityInput, setproductQuantityInput] = useState(1)
    const productQuantityAdd = (e) => {
        setproductQuantityInput((value) => (value + 1))
    }
    console.log(productQuantityInput)
    const productQuantitySub = (e) => {

        setproductQuantityInput((value) => {
            if (value === 1 || value < 1 || value == undefined || value == null || value == '' || value == NaN) {
                return value = 1

            } else {
                return value = value - 1

            }
        })

    }


    // Add To Cart

    const [productDetail, setproductDetail] = useState('');
    // console.log(productDetail)
    const addToCart = (e) => {
        setproductDetail(e)

        const existingCartItemsString = localStorage.getItem('CART_SESSION');
        const existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];

        if (productQuantityInput > productDetail.product_moq) {
            console.log('error')
            Toasts.error('Out Of Stock');
        } else {
            // localStorage.setItem('CART_SESSION',JSON.stringify(productDetail));
            console.log(productDetail)
            const product = {
                product_id: productDetail.product_id,
                product_name: productDetail.product_name,
                product_image: productDetail.product_image ? productDetail.product_image : constant.DEFAULT_IMAGE,
                product_price: productDetail.product_price,
                product_selling_price: productDetail.product_selling_price,
                product_discount: productDetail.product_discount,
                quantity: productQuantityInput,
            }

            const updatedCartItems = [...existingCartItems, product];

            localStorage.setItem('CART_SESSION', JSON.stringify(updatedCartItems))
            Toasts.success('Product Added Successfully')
        }
    }

    return (
        <>
            <Header />
            <main id="main">
                {/* <!-- ======= Portfolio Details Section ======= --> */}
                <ToastContainer />

                {
                    loading == false ? <>
                        <section id="portfolio-details" className="product-details ">

                            <div className='container'>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <Skeleton style={{ width: '100%' }} height={500}></Skeleton>

                                    </div>
                                    <div className="col-lg-6">
                                        <Skeleton style={{ width: '111px' }} height={25}></Skeleton>
                                        <Skeleton style={{ width: '200px' }} height={35}></Skeleton>
                                        <Skeleton style={{ width: '100px' }} height={15}></Skeleton>
                                        <div className='d-flex justify-content-start align-items-center me-2'>
                                            <Skeleton style={{ width: '60px' }} height={25}></Skeleton>
                                            &nbsp;
                                            <Skeleton style={{ width: '60px' }} height={25}></Skeleton>

                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>

                                            <Skeleton style={{ width: '170px' }} height={50}></Skeleton>
                                            <Skeleton style={{ width: '200px' }} height={50}></Skeleton>
                                        </div>

                                        <div className="mt-5">
                                            <Skeleton style={{ width: '100%' }} height={150}></Skeleton>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </section>
                    </> : <>
                        {
                            productData != '' ?
                                <>
                                    <section id="portfolio-details" className="product-details">
                                        <div className="container">
                                            {/* <div className="row gy-4">
                                        <div className="col-lg-6">
                                            <div className="product-details-slider">
                                                <img src={productData?.product_image ? product_image + productData?.product_image : constant.DEFAULT_IMAGE} alt="" />
                                            </div>
                                        </div> */}


                                            <div className="product-single mb-5 g-3 row">
                                                <div className="col-lg-6">
                                                    <div className="pss-slider">
                                                        <div className="gallery-page__single">
                                                            <div className="gallery-page__img"><img src={productData?.product_image ? product_image + productData?.product_image : constant.DEFAULT_IMAGE} alt="" />
                                                                <div className="gallery-page__icon"><a className="img-popup" href="https://triveniexport.in/csadmin/public/img/uploads/products/35011708948562.jpg"><i className="d-icon-zoom"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <nav aria-label="breadcrumb">
                                                            <ol className="breadcrumb"><li className="breadcrumb-item h6"><a href="/">Home</a></li><li className="breadcrumb-item h6 active" aria-current="page">{productData?.product_name ? productData?.product_name : ''}</li></ol></nav><h1 className="product-name">{productData?.product_name ? productData?.product_name : ''}</h1>
                                                        <div className="product-meta">SKU:
                                                            <span className="product-sku">{productData?.product_sku ? productData?.product_sku : ''}</span>
                                                        </div>
                                                        <div className="stock-text">Availability:
                                                            <span className="instock">In Stock</span>
                                                        </div>
                                                        <div className='product_quantity'>
                                                            <div className="product_decress">
                                                                <button onClick={productQuantitySub}>-</button>
                                                            </div>
                                                            <div className="product_input">
                                                                <input type="text" value={productQuantityInput} />
                                                            </div>
                                                            <div className="product_incress" >
                                                                <button onClick={productQuantityAdd}>+</button>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <div className='product_selling_price'>
                                                                ₹{productData?.product_selling_price}
                                                            </div>
                                                            <div className="product_mrp mx-2">
                                                                <del>
                                                                    ₹{productData?.product_price}
                                                                </del>
                                                            </div>
                                                            <div className="product_discount">
                                                                {productdiscount}%
                                                            </div>
                                                        </div>
                                                        <hr className="product-divider mb-3" />
                                                        <div className="product-button">
                                                            <button className="btn btn-primary me-2" onClick={(e) => addToCart(productData)}><i className="d-icon-bag" ></i>Add To Cart</button>
                                                            <button className="btn btn-primary-outline btn-small ">Buy Now</button>
                                                        </div>
                                                        <hr className="product-divider mb-3" />
                                                        {/* <hr className="mt-0" /> */}
                                                        <p>Real time
                                                            <span className="rvisitor">+42</span> visitor right now</p>
                                                    </div>

                                                </div>
                                            </div>



                                            {/* </div> */}

                                        </div>
                                        <div className="product p-0">
                                            <div className="container ">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <ul className="product-list"  >

                                                            {
                                                                productData.product_description != '' ?
                                                                    <li >
                                                                        <div data-bs-toggle="collapse" className="collapsed question" href={`#product${productData.product_id}`}>Discription <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                                                                        <div id={`product${productData.product_id}`} className="collapse" data-bs-parent=".product-list">
                                                                            <div className='text-black' dangerouslySetInnerHTML={{ __html: productData.product_description }}></div>
                                                                            {/* <div className='text-black'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi accusamus adipisci quasi eos quas! Molestias voluptas ducimus natus explicabo, quam non ipsum inventore modi sunt delectus aut dicta. Illo, eaque itaque! Magni, consequuntur laudantium?</div> */}
                                                                        </div>
                                                                    </li>
                                                                    : ''
                                                            }

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </>
                                : ''
                        }
                    </>
                }


                {/* Related product */}
                <section id="portfolio" className="portfolio mt-0">

                    <div className="container portfolio-containerr">
                        <div className="row">
                            <div className="col-lg-12 mb-2">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h5 >
                                            Related Product
                                        </h5>
                                    </div>
                                    <div>
                                        <a href="/product">See All</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            {
                                loading2 == false ? <>
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
                                            relproductData.length > 0 ? <>
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
                                                        }, 400: {
                                                            slidesPerView: 2,
                                                        },
                                                        768: {
                                                            slidesPerView: 3,
                                                        },
                                                        1024: {
                                                            slidesPerView: 4,
                                                        },
                                                        1200: {
                                                            slidesPerView: 5,
                                                        },
                                                    }}

                                                >
                                                    {relproductData.map((value, index) => (
                                                        <>
                                                            <SwiperSlide className='px-3'>
                                                                <div className="portfolio-item filter-app" key={index}>
                                                                    <a href={`product/${value.product_slug}`}>
                                                                        <div className="portfolio-wrap">
                                                                            <img src={value?.product_image != '' ? product_image + value?.product_image : constant.DEFAULT_IMAGE} className="img-fluid" alt="" style={{ height: '285px' }} />

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


                {/* <!-- End Portfolio Details Section --> */}
            </main>
            {/* <!-- End #main --> */}
            <Footer />
            {
                showQuick && (<QuickViewModal showmodal={showQuick} handleClose={handlehide} quickModalProductData={quickModalProductData} />)
            }
        </>
    )
}

export default ProductDetails