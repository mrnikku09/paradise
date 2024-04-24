// import { Modal } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';


const QuickViewModal = ({ showmodal, handleClose, quickModalProductData }) => {

    const [showQuick, setShowQuick] = useState(showmodal);
    // const [handleClose, sethandleClose] = useState('');
    const [productData, setproductData] = useState(null)
    const [product_image, setproductImage] = useState(null)
    const didMountRef = useRef(true)


    useEffect(() => {
        if (didMountRef.current) {
            const dataString = {
                'product_slug': quickModalProductData.product_slug
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

    // console.log(productData)
    // setproductImage(quickModalProductData)
    const hide = () => {
        setShowQuick(false);
    }
    const onhide = () => {
        setShowQuick(false);
    }
    return (
        <>
            {/* <div className={`modal ${showQuick ? 'show':''} fade custom-modal product_modal`} id="productview" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true"> */}
            <Modal show={showQuick} onHide={handleClose} className="fade custom-modal product_modal modal-lg product_modal_dialog">
                {/* <div className="modal-dialog modal-lg product_modal_dialog" role="document"> */}
                {/* <div className="modal-content product_modal_content"> */}
                    <Modal.Header closeButton>
                        <Modal.Title className='h6' id="modalLabel">{productData?.product_name ? productData?.product_name : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            productData != '' ?
                                <>
                                    <div id="portfolio-details" className="product-details">
                                        <div className="container">
                                            {/* <div className="row gy-4">
                                        <div className="col-lg-6">
                                            <div className="product-details-slider">
                                                <img src={productData?.product_image ? product_image + productData?.product_image : constant.DEFAULT_IMAGE} alt="" />
                                            </div>
                                        </div> */}
                                        <div className="row">

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
                                                <div className="col-lg-6"><nav aria-label="breadcrumb"></nav><h6 className="product-name">{productData?.product_name ? productData?.product_name : ''}</h6>
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
                                        </div>
                                    </div>
                                </>
                                : ''
                        }
                    </Modal.Body>
                {/* </div> */}
                {/* </div> */}
            </Modal>
        </>
    )
}

export default QuickViewModal