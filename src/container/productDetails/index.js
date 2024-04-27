import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { ApiService } from '../../Components/Services/apiservices'
import { useParams } from 'react-router-dom'
import constant from '../../Components/Services/constant'
import Skeleton from 'react-loading-skeleton'

const ProductDetails = () => {

    const [productData, setproductData] = useState('')
    const [product_image, setproductImage] = useState('')
    const [addToCart, setaddToCart] = useState('')
    const [loading, setloading] = useState(false);



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

                setproductData(res?.productDetails)
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

    return (
        <>
            <Header />
            <main id="main">
                {/* <!-- ======= Portfolio Details Section ======= --> */}

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


                                            <div className="product-single mb-5 row">
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
                                                            <button className="btn btn-primary me-2"><i className="d-icon-bag" ></i>Add To Cart</button>
                                                            <button className="btn btn-primary-outline btn-small ">Quick Enquiry</button>
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
                                        <div className="product">
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
                    </>}


                {/* <!-- End Portfolio Details Section --> */}
            </main>
            {/* <!-- End #main --> */}
            <Footer />
        </>
    )
}

export default ProductDetails