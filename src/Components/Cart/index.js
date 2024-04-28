import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import constant from '../Services/constant'
import { useNavigate } from 'react-router-dom'

import Toasts from '../Extension/Toast/Toasts'
import { ToastContainer } from 'react-toastify'
import { RiDeleteBack2Fill, RiDeleteBin2Fill, RiHeartFill } from '@remixicon/react'
import { ApiService } from '../Services/apiservices'
import { Spinner } from 'react-bootstrap'

const Cart = () => {

    const [loading, setloading] = useState(false)

    const navigate = useNavigate();
    let cartsessiondata = localStorage.getItem('CART_SESSION')
    let existingCartItems = cartsessiondata ? JSON.parse(cartsessiondata) : []



    const [productQuantityInput, setproductQuantityInput] = useState(1)
    const productQuantityAdd = (productData) => {

        setloading(true)
        let cartsessiondata = localStorage.getItem('CART_SESSION')
        let existingCartItems = cartsessiondata ? JSON.parse(cartsessiondata) : []
        // console.log(cartsessioncheck)

        const existingCartItemsupdate = existingCartItems.findIndex((item) => {
            return (
                item.product_id === productData.product_id
            )
        })
        // console.log(existingCartItems[existingCartItemsupdate].quantity)
        existingCartItems[existingCartItemsupdate].quantity += 1
        localStorage.setItem("CART_SESSION", JSON.stringify(existingCartItems));
        navigate('/cart')
        setTimeout(() => {
            setloading(false)
            Toasts.success("Cart Updated Successfully!!!");
        }, 500);




    }

    const productQuantitySub = (productData) => {
        setloading(true)
        let cartsessiondata = localStorage.getItem('CART_SESSION')
        let existingCartItems = cartsessiondata ? JSON.parse(cartsessiondata) : []

        const existingCartItemsupdate = existingCartItems.findIndex((value) => {
            return (
                value.product_id === productData.product_id
            )
        })


        if (productData.quantity == 1) {
            console.log(1)
            // existingCartItems[existingCartItemsupdate].splice()
            existingCartItems.splice(existingCartItemsupdate, 1);
            localStorage.setItem("CART_SESSION", JSON.stringify(existingCartItems));
            navigate('/cart')
            setTimeout(() => {
                setloading(false)
                Toasts.success("Item Removed Successfully!!!");
            }, 500);

        } else {

            existingCartItems[existingCartItemsupdate].quantity -= 1
            localStorage.setItem("CART_SESSION", JSON.stringify(existingCartItems));
            navigate('/cart')
            setTimeout(() => {
                setloading(false)
                Toasts.success("Cart Updated Successfully!!!");
            }, 500);

        }

    }

    const productQuantitydelete = (productData) => {
        setloading(true)

        let cartsessiondata = localStorage.getItem('CART_SESSION')
        let existingCartItems = cartsessiondata ? JSON.parse(cartsessiondata) : []

        const existingCartItemsupdate = existingCartItems.findIndex((value) => {
            return (
                value.product_id === productData.product_id
            )
        })

        existingCartItems.splice(existingCartItemsupdate, 1);
        localStorage.setItem('CART_SESSION', JSON.stringify(existingCartItems))
        navigate('/cart')
        
        
        setTimeout(() => {
            setloading(false)
            Toasts.success("Item Delete Successfully!!!");

        }, 500);

    }

    // navigate('/home');

    return (
        <>
            <Header />
            <main id="main">
                <section>
                    <div className="container">
                        {
                            loading == true ? <>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
                                            <Spinner animation="border" variant="danger" />

                                        </div>
                                    </div>
                                </div>
                            </> : <>
                                {
                                    existingCartItems.length > 0 ? <>
                                        <div className="row text-center">
                                            <h3 className='mb-5'>My Cart</h3>
                                        </div>
                                        <div className="row">
                                            <ToastContainer />
                                            <div className="col-lg-12">
                                                {
                                                    existingCartItems.map((value, index) => (
                                                        <>
                                                            <div class="cartsec">
                                                                <div class="row">
                                                                    <div class="col-lg-2 col-3">
                                                                        <div class="cartsec-media">
                                                                            <img src={value.product_image ? value.product_image : constant.DEFAULT_IMAGE} width="100" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-lg-10 col-9"><h5 class="cartsec-name"><a href="javascript:void(0)">{value.product_name}</a></h5>
                                                                        <div class="cartsec-price">
                                                                            <div class="price-new me-3">₹{value.product_selling_price}
                                                                            </div>
                                                                            <div class="price-old">₹{value.product_price}
                                                                            </div>
                                                                        </div>
                                                                        <div class="cartsec-footer">
                                                                            <div className='product_quantity'>
                                                                                <div className="product_decress">
                                                                                    <button onClick={(e) => productQuantitySub(value)}>-</button>
                                                                                </div>
                                                                                <div className="product_input">
                                                                                    <input type="text" value={value.quantity} />
                                                                                </div>
                                                                                <div className="product_incress" >
                                                                                    <button onClick={(e) => productQuantityAdd(value)}>+</button>
                                                                                </div>
                                                                            </div>
                                                                            <div className="delete_item">
                                                                                <RiDeleteBin2Fill size={25} color="black" className="my-icon" onClick={(e) => productQuantitydelete(value)} style={{ cursor: 'pointer' }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </> : <>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <ToastContainer />

                                                <div className="empty_cart">
                                                    <img src="assets/img/empty-cart.webp" style={{ height: '200px' }} alt="" />
                                                    <h5>Cart Is Empty</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        }

                    </div>
                    <ToastContainer />

                </section>
            </main>
            <Footer />
        </>
    )
}

export default Cart