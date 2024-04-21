import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { ApiService } from '../../Components/Services/apiservices'
import { useParams } from 'react-router-dom'
import constant from '../../Components/Services/constant'

const ProductDetails = () => {

    const [productData, setproductData] = useState('')
    const [product_image, setproductImage] = useState('')
    const [addToCart, setaddToCart] = useState('')

    
    const didMountRef = useRef(true)
    const { slug } = useParams();

    useEffect(() => {
        if (didMountRef.current) {
            const dataString = {
                'product_slug': slug
            }
            ApiService.postData('product-details', dataString).then((res) => {
                if (res.status === 'success') {
                    setproductData(res?.productDetails)
                    setproductImage(res?.PRODUCT_IMAGE_PATH)
                }
            })
        }
        didMountRef.current = false
    }, [])
    
    return (
        <>
            <Header />
            <main id="main">
                {/* <!-- ======= Portfolio Details Section ======= --> */}
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
                                        <div className="col-lg-6"><nav aria-label="breadcrumb"><ol className="breadcrumb"><li className="breadcrumb-item"><a href="/">Home</a></li><li className="breadcrumb-item active" aria-current="page">{productData?.product_name ? productData?.product_name : ''}</li></ol></nav><h1 className="product-name">{productData?.product_name ? productData?.product_name : ''}</h1>
                                            <div className="product-meta">SKU:
                                                <span className="product-sku">{productData?.product_sku ? productData?.product_sku : ''}</span>
                                            </div>
                                            <div className="stock-text">Availability:
                                                <span className="instock">In Stock</span>
                                            </div><hr className="product-divider mb-3" />
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

                                    {/* <div className="col-lg-6 px-4">
                                            <div className="product-info">
                                                <h3>Project information</h3>
                                                <ul>
                                                    <li><strong>Category</strong>: Web design</li>
                                                    <li><strong>Client</strong>: ASU Company</li>
                                                    <li><strong>Project date</strong>: 01 March, 2020</li>
                                                    <li><strong>Project URL</strong>: <a href="#">www.example.com</a></li>
                                                </ul>
                                            </div>
                                            <div className="product-description">
                                                <h2>This is an example of product detail</h2>
                                                <p>
                                                    Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
                                                </p>
                                            </div>
                                        </div> */}

                                    {/* </div> */}

                                </div>
                            </section>
                        </>
                        : ''
                }

                {/* <!-- End Portfolio Details Section --> */}
            </main>
            {/* <!-- End #main --> */}
            <Footer />
        </>
    )
}

export default ProductDetails