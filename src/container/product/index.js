import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';
import QuickViewModal from '../../Components/Modals/quick_view_modal';
import Skeleton from 'react-loading-skeleton';

const Product = () => {
    const [showQuick, setShowQuick] = useState(false);
    const [productData, setproductData] = useState([]);
    const [productImage, setproductImage] = useState([]);
    const [quickModalProductData, setquickModalProductData] = useState(null);
    const [categoryListData, setcategoryListData] = useState([]);
    const [activeButton, setactiveButton] = useState(false)
    const [loading, setloading] = useState(false);
    const [loading2, setloading2] = useState(false);

    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            getproductdetails();
        }
        didMountRef.current = false;
    }, [])

    const getproductdetails = () => {
        ApiService.fetchData('product').then((res) => {
            if (res.status == "success") {
                setproductData(res?.productData);
                setproductImage(res?.PRODUCT_IMAGE_PATH);
                setloading(true)
            }
        })

        ApiService.fetchData('category').then((res) => {
            if (res.status == "success") {
                setcategoryListData(res?.categoryData);
                setactiveButton('all')
                setloading2(true)
            }
        })
    }

    const categorywiseproduct = (slug, type) => {
        setloading(false)

        if (type !== '') {
            let datastring = {
                type: type
            }
            ApiService.postData('product', datastring).then((res) => {
                if (res.status == "success") {
                    setproductData(res?.productData);
                    setproductImage(res?.PRODUCT_IMAGE_PATH);
                    setactiveButton('all')
                    setloading(true)
                    // setloading2(true)
                }
            })
        } else {
            let datastring = {
                cat_slug: slug
            }
            ApiService.postData('product', datastring).then((res) => {
                if (res.status == "success") {
                    setproductData(res?.catergorywiseproduct);
                    setproductImage(res?.PRODUCT_IMAGE_PATH);
                    setactiveButton(slug)
                    setloading(true)
                    // setloading2(true)

                }
            })
        }

    }

    // const allproductData=(e)=>{
    //     // console.log(e)
    //     const datastring={
    //         type:e
    //     }
    // }

    const quickview = (value) => {
        setShowQuick(true);
        setquickModalProductData(value);

    }
    const handlehide = () => {
        setShowQuick(false);
    }
    return (
        <>
            <Header />
            <main id="main">
                <div className="subheader">
                    <div className="subheader-overlay"></div>
                    <div className="subheader-content">
                        <h1>Product</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item" aria-current="page">Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>

            </main>

            <div className="category_list">
                <div className="conatiner">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="category_list">
                                <ul>
                                    {
                                        loading2 == false ? <>

                                            {[...Array(5)].map((_, index) => (
                                                <>
                                                    <li>
                                                        <Skeleton style={{ width: '170px' }} height={50}></Skeleton>
                                                    </li>
                                                </>
                                            ))
                                            }
                                        </> :
                                            <>
                                                <li><button class={`btn btn-primary-outline btn-small ${activeButton === 'all' ? "active" : ""}`} onClick={(e) => categorywiseproduct('', 'all')}>All</button></li>


                                                {
                                                    categoryListData.length > 0 ? <>
                                                        {
                                                            categoryListData.map((value, index) => (
                                                                <>
                                                                    <li><button class={`btn btn-primary-outline btn-small ${value.cat_slug == activeButton ? "active" : ""}`} onClick={(e) => categorywiseproduct(value?.cat_slug, '')}>{value.cat_name}</button></li>
                                                                </>
                                                            ))
                                                        }
                                                    </> : <>
                                                    </>
                                                }
                                            </>
                                    }



                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id="portfolio" className="portfolio m-0">
                <div className="container portfolio-containerr" >
                    <div className="row mb-3">

                        <div className="col-lg-12">
                            <h6 className='fs-5'>
                                Showing results of {productData ? productData.length : ''} products.
                            </h6>
                        </div>
                    </div>
                    <div className="row g-3" >
                        {
                            loading == false ? <>

                                {[...Array(6)].map((_, index) => (
                                    <>
                                        <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">

                                            <Skeleton style={{ width: '100%' }} height={400}></Skeleton>
                                        </div>
                                    </>
                                ))
                                }
                            </> :
                                <>
                                    {
                                        productData.length > 0 ?
                                            productData.map((value, index) => (
                                                <>
                                                    <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app" key={index}>
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
                                                                            </dd>
                                                                            <dt class="price__compare">
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

                                                                            </dd>
                                                                        </div><dl class="unit-price caption hidden"><dt class="visually-hidden">Unit price
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
                                                    </div>
                                                </>
                                            )) :
                                            <>
                                                <div className="col-lg-12">
                                                    <h2>No More Products found.</h2>
                                                </div>
                                            </>
                                    }
                                </>}
                    </div>
                </div>
            </section>
            {
                showQuick && (<QuickViewModal showmodal={showQuick} handleClose={handlehide} quickModalProductData={quickModalProductData} />)
            }
            <Footer />
        </>

    )
}

export default Product