import React, { useContext, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import constant from '../Services/constant'
import { useNavigate } from 'react-router-dom'

import Toasts from '../Extension/Toast/Toasts'

import { ToastContainer } from 'react-toastify'
import { RiDeleteBack2Fill, RiDeleteBin2Fill, RiDeleteBin7Fill, RiDeleteBin7Line, RiHeartFill } from '@remixicon/react'
import { ApiService } from '../Services/apiservices'
import { Spinner } from 'react-bootstrap'
import DataContext from '../Context'
import LoginModal from '../Modals/login_model'

const Cart = () => {

    const [loading, setloading] = useState(false)

    const { cartCount, setcartCount } = useContext(DataContext)
    const { cartsummary, setcartsummary, rerenderdata } = useContext(DataContext)

    // console.log(cartCount)
    // const navigate = useNavigate();
    let cartsessiondata = localStorage.getItem('CART_SESSION')
    let existingCartItems = cartsessiondata ? JSON.parse(cartsessiondata) : []



    const [productQuantityInput, setproductQuantityInput] = useState(1)
    const productQuantityAdd = (productData) => {
        // console.log(productData)
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
        if (existingCartItems[existingCartItemsupdate].quantity == existingCartItems[existingCartItemsupdate].product_moq) {
            Toasts.error(`You Can Add Only ${existingCartItems[existingCartItemsupdate].product_moq} Items`);
            setloading(false)

        } else {
            existingCartItems[existingCartItemsupdate].quantity += 1
            localStorage.setItem("CART_SESSION", JSON.stringify(existingCartItems));

            // navigate('/cart')
            rerenderdata();

            setTimeout(() => {
                setloading(false)
                Toasts.success("Cart Updated Successfully!!!");
            }, 500);
        }





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
            // console.log(1)
            // existingCartItems[existingCartItemsupdate].splice()
            existingCartItems.splice(existingCartItemsupdate, 1);
            localStorage.setItem("CART_SESSION", JSON.stringify(existingCartItems));
            setcartCount(cartCount - 1)
            // navigate('/cart')
            rerenderdata();

            setTimeout(() => {
                setloading(false)
                Toasts.success("Item Removed Successfully!!!");
            }, 500);

        } else {

            existingCartItems[existingCartItemsupdate].quantity -= 1
            localStorage.setItem("CART_SESSION", JSON.stringify(existingCartItems));
            // navigate('/cart')
            rerenderdata();

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
        // navigate('/cart')
        setcartCount(cartCount - 1)


        rerenderdata();
        setTimeout(() => {
            setloading(false)
            Toasts.success("Item Delete Successfully!!!");

        }, 500);


    }
    const { existingUserSession } = useContext(DataContext)


    const [showloginmodal, setshowloginmodal] = useState(false);
    const usersession = () => {
        if (existingUserSession != '') {
            
        } else {
            setshowloginmodal(!showloginmodal);

        }
    }
    const hideloginmodal = () => {
        setshowloginmodal(!showloginmodal);
        console.log(showloginmodal)
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
                                        <div className="row">
                                            <h3 className='mb-5'>My Cart</h3>
                                        </div>
                                        <div className="row">
                                            <ToastContainer />
                                            <div className="col-lg-8">
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
                                                                                <RiDeleteBin7Line size={25} color="black" className="my-icon" onClick={(e) => productQuantitydelete(value)} style={{ cursor: 'pointer' }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))
                                                }

                                            </div>


                                            <div class="col-lg-4">
                                                {/* <div class="panel p-4 mb-3" style={{border: "1px solid rgb(238, 238, 238);"}}>
                                                    <div class="panel-body">
                                                        <div class="applycoup-desktop">
                                                            <div class="applycoup-mobile-text"><img src="/img/presents.png" /><h6 class="mb-0 tx-12">Apply Coupon</h6>
                                                            </div>
                                                            <div class="applycoup-mobile-arrow"><i class="d-icon-angle-right"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div class="panel p-4 mb-3" style={{ border: "1px solid rgb(238, 238, 238);" }}>
                                                    <div class="panel-header">Price Details
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class="pcb-list mt-3"><ul><li>Item Total<span class="ml-auto">₹{cartsummary.totalmrp}</span></li><li>Discount<span class="ml-auto tx-green">-₹{cartsummary.discount}</span></li><li>Coupon Discount<span class="ml-auto tx-green">-₹0.00</span></li><li> Shipping &amp; taxes calculated at checkout</li></ul>
                                                        </div><hr />
                                                        <div class="pcb-list-second"><ul><li>Total Amount<span class="ml-auto">₹{cartsummary.totalamount}</span></li></ul>
                                                        </div><hr /><p class="text-center mt-20">We Accepted all Major Cards</p>
                                                        <div class="cardlist"><i class="fab fa-cc-mastercard"></i><i class="fab fa-cc-discover"></i><i class="fab fa-cc-visa"></i>
                                                        </div>
                                                    </div>
                                                </div><a href="javascript:void(0)" onClick={usersession} class="btn btn-primary btn-block btn-large w-100">Proceed to Checkout</a>


                                            </div>
                                        </div>
                                    </> : <>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <ToastContainer />

                                                <div className="empty_cart">
                                                    <img src="assets/img/empty-cart.webp" style={{ height: '300px' }} alt="" />
                                                    <h5 className='mb-5'>Cart Is Empty</h5>
                                                    <a href="/home" class="btn btn-primary btn-block btn-large">Continue Shopping</a>
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
            {
                showloginmodal && <LoginModal showloginmodal={showloginmodal} hideloginmodal={hideloginmodal} />
            }
            <Footer />
        </>
    )
}

export default Cart