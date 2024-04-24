import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';
import QuickViewModal from '../../Components/Modals/quick_view_modal';

const Product = () => {
    const [showQuick, setShowQuick] = useState(false);
    const [productData, setproductData] = useState([]);
    const [productImage, setproductImage] = useState([]);
    const [quickModalProductData, setquickModalProductData] = useState(null);

    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData('product').then((res) => {
                if (res.status == "success") {
                    setproductData(res?.productData);
                    setproductImage(res?.PRODUCT_IMAGE_PATH);
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

            <section id="portfolio" className="portfolio">
                <div className="container portfolio-containerr" data-aos="fade-up">
                    <div className="row" data-aos="fade-up" data-aos-delay="200">
                        {
                            productData.length > 0 ?
                                productData.map((value, index) => (
                                    <>
                                        <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app" key={index}>
                                            <a href={`product/${value.product_slug}`}>
                                                <div className="portfolio-wrap">
                                                    <img src={value?.product_image != '' ? productImage + value?.product_image : constant.DEFAULT_IMAGE} className="img-fluid" alt="" />

                                                    <div className="portfolio-info">
                                                        <h4 className='px-3'>{value?.product_name}</h4>

                                                        <a href='javascript:void(0)' onClick={()=>quickview(value)}  className='quick-view' >
                                                            Quick View
                                                        </a>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </>
                                )) :
                                ''
                        }
                    </div>
                </div>
            </section>
            {
                showQuick && (<QuickViewModal showmodal={showQuick} handleClose={handlehide} quickModalProductData={quickModalProductData}/>)
            }
            <Footer />
        </>

    )
}

export default Product