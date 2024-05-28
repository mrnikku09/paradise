// import { Modal } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';
import Toasts from '../Extension/Toast/Toasts';
import { useNavigate } from 'react-router-dom';
import DataContext from '../Context';


const QuickViewModal = ({ showmodal, handleClose, quickModalProductData }) => {

    const [showQuick, setShowQuick] = useState(showmodal);
    // const [handleClose, sethandleClose] = useState('');
    const [productData, setproductData] = useState(null)
    const [product_image, setproductImage] = useState(null)
    const didMountRef = useRef(true)
    const [visitor_count, setvisitor_count] = useState(0)
    const{cartCount,setcartCount}=useContext(DataContext)

    const navigate=useNavigate()
    console.log(visitor_count)

    // console.log(productdiscount)
    useEffect(() => {
        if (didMountRef.current) {
            setvisitor_count(Math.floor(Math.random() * (99 - 10 + 1)) + 10);

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
            'product_slug': quickModalProductData.product_slug
        }
        ApiService.postData('product-details', dataString).then((res) => {
            if (res.status === 'success') {
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



    // console.log(productData)
    // setproductImage(quickModalProductData)
    const hide = () => {
        setShowQuick(false);
    }
    const onhide = () => {
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
    const addToCart = (productData) => {
        setproductDetail(productData)
        let existingCartItemsString = localStorage.getItem('CART_SESSION');
        let existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];
        if (productQuantityInput > productData.product_moq) {
            if (productData.product_moq == 0) {
                Toasts.error(`Out Of Stock`);
            } else {
                Toasts.error(`You Can Add Only ${productData.product_moq} Items`);
            }
        } else {
            // localStorage.setItem('CART_SESSION',JSON.stringify(productData));
            // console.log(productData)
            // console.log(existingCartItems)

            let existingCartItemsData = existingCartItems.findIndex((value) => {
                return (
                    value.product_id === productData.product_id
                )
            })
            console.log(productData.product_moq)
            if (existingCartItemsData !== -1) {
                existingCartItems[existingCartItemsData].quantity += productQuantityInput
                // console.log(existingCartItems[existingCartItemsData].quantity);
                if (existingCartItems[existingCartItemsData].quantity > productData.product_moq) {
                    Toasts.error('Out Of Stock')
                } else {

                    localStorage.setItem('CART_SESSION', JSON.stringify(existingCartItems))
                    Toasts.success('Product Updated Successfully')
                }
            } else {

                let product = {
                    product_id: Number(productData.product_id),
                    product_name: productData.product_name,
                    product_image: productData.product_image ? product_image + productData.product_image : constant.DEFAULT_IMAGE,
                    product_price: Number(productData.product_price),
                    product_moq: Number(productData.product_moq),
                    product_selling_price: Number(productData.product_selling_price),
                    product_discount: Number(productData.product_discount),
                    quantity: Number(productQuantityInput),
                }

                let updatedCartItems = [...existingCartItems, product];

                localStorage.setItem('CART_SESSION', JSON.stringify(updatedCartItems))
                setcartCount(cartCount+1)
                Toasts.success('Product Added Successfully')
            }
        }
    }

    const gotocart=()=>{
        navigate('/cart')
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

                                            <div className="product-single row">
                                                <div className="col-lg-6 mb-3">
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
                                                    {productData?.product_moq ? 
                                                        <span className="instock">In Stock</span> : 
                                                        <span className="text-danger">Out Of Stock</span>}
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
                                                    <hr className="product-divider mb-3" />
                                                    <div className="product-button">
                                                        <button className="btn btn-primary me-2"  onClick={(e) => addToCart(productData)}><i className="d-icon-bag" ></i>Add To Cart</button>
                                                        <button className="btn btn-primary-outline btn-small" onClick={gotocart}>Go To Cart</button>
                                                    </div>
                                                    <hr className="product-divider mb-3" />
                                                    {/* <hr className="mt-0" /> */}
                                                    <p>Real time
                                                        <span className="rvisitor">+{visitor_count}</span> visitor right now</p>
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