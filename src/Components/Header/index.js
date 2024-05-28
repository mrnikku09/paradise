import React, { useContext, useEffect, useRef, useState } from 'react'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';
import Login from '../../Components/Modals/login_model';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import DataContext from '../Context';
import { BrowserView, MobileView } from 'react-device-detect';
import { RiUserLine } from '@remixicon/react';
import LoginModal from '../../Components/Modals/login_model';

const Header = () => {
    const [settingData, setsettingData] = useState();
    const [setting_image_path, setsetting_image_path] = useState();
    const [loading, setloading] = useState('');
    const location = useLocation();
    const [cartsesssion, setcartsesssion] = useState('')
    const { cartCount, setcartCount } = useContext(DataContext)
    const [searchhide, setsearchhide] = useState(false)
    const [searchData, setsearchData] = useState({
        seachval: ''
    })
    const [searchwiseproduct, setsearchwiseproduct] = useState([])
    const [searchwisecategory, setsearchwisecategory] = useState([])
    const [searchwiseImage, setsearchwiseImage] = useState('')
    const { existingUserSession } = useContext(DataContext)



    const cartsessiondata = localStorage.getItem('CART_SESSION')
    const existingCartItems = cartsessiondata ? JSON.parse(cartsessiondata) : []


    const [menudata, setmenudata] = useState([]);
    const didMountRef = useRef(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (didMountRef.current) {
            setloading(true);

            ApiService.fetchData('settingsData').then((res) => {
                if (res.status == "success") {
                    setsettingData(res?.settings);
                    setsetting_image_path(res?.setting_image_path);
                }
            })
            ApiService.fetchData('menu').then((res) => {
                if (res.status == "success") {
                    setmenudata(res?.menuData);
                    setloading(true)

                }
            })
        }
        didMountRef.current = false;
    }, [])


    const searchval = (e) => {
        // if (e.target.value != '') {
        //     setsearchhide(true)
        // } else {
        //     setsearchhide(false)
        // }
        // setsearchhide(true)
        console.log(e.target.value)
        const { name, value } = e.target

        setsearchData((valuee) => ({
            ...valuee, [name]: value
        }))

        // console.log(searchData)
        if (value.length >0) {
            setsearchhide(true)

            const dataString = {
                seachval: value
            }
            ApiService.postData('search-wise-product', dataString).then((res) => {
                if (res.status === 'success') {
                    setsearchwiseproduct(res?.product)
                    setsearchwisecategory(res?.catergory)
                    setsearchwiseImage(res?.PRODUCT_IMAGE_PATH)
                }
            })
        } else {
            setsearchhide(false)

        }


    }

    const [showloginmodal, setshowloginmodal] = useState(false);
    const loginmodal = () => {
        if (existingUserSession != '') {
            navigate('/account');
        }else{
            setshowloginmodal(!showloginmodal);
            
        }
    }
    const hideloginmodal = () => {
        setshowloginmodal(!showloginmodal);
        console.log(showloginmodal)
    }


    const gotToPage = (route) => {
        navigate(route);
    };
    return (
        <>
            <BrowserView>
                {/* <!-- ======= Header ======= --> */}
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center justify-content-between">
                        {
                            loading == false ? <>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <div>
                                        <Skeleton width={80} style={{ height: '33px' }}></Skeleton>
                                    </div>
                                    <div className='d-flex justify-content-between' style={{ gap: '30px' }}>
                                        {[...Array(5)].map((_, index) => (
                                            <>

                                                <Skeleton width={100} height={33}></Skeleton>
                                            </>
                                        ))}

                                    </div>
                                </div>
                            </> :
                                <>

                                    <div className="logo">
                                        {/* <h1 className="text-light"><a href="index.html"><span>Paradise</span></a></h1> */}
                                        {/* <!-- Uncomment below if you prefer to use an image logo --> */}
                                        <a href="/"><img src={settingData != null ? setting_image_path + settingData.logo : constant.DEFAULT_IMAGE} alt="" className="img-fluid" /></a>
                                    </div>
                                    <div className='web-search'>
                                        <input type="text" name='seachval' value={searchData.seachval} className='form-control' placeholder='Search Product...' onChange={(e) => searchval(e)} />
                                    </div>
                                    <nav id="navbar" className="navbar">
                                        <ul>
                                            {menudata.length > 0 ?
                                                menudata.map((value, index) => {
                                                    return (
                                                        <li key={index}><a className={`nav-link scrollto`} href={`/${value?.menu_slug ? value?.menu_slug : "/"}`}>{value?.menu_name} <i className="fa-solid fa-house"></i></a></li>
                                                    )
                                                })
                                                : ''
                                            }


                                            {/* <li><a className="getstarted scrollto" href="https://paradise.nikkblink.site/csadmin/">Admin Panel</a></li> */}
                                            <li onClick={() => loginmodal()}>
                                                <a className='user-toggle' href='javascript:void(0)' >
                                                    <RiUserLine></RiUserLine>
                                                </a>
                                            </li>
                                            {
                                                cartCount > 0 ? <>
                                                    <li>
                                                        <a class="cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">{cartCount}</span></a>
                                                    </li>

                                                </> : <>
                                                    <li>
                                                        <a class="cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">0</span></a>
                                                    </li>
                                                </>
                                            }

                                        </ul>
                                        <div className='d-flex justify-content-between align-items-center g-3'>
                                            <a className='user-toggle mobile-user-toggle' href='javascript:void(0)' onClick={() => loginmodal()}>
                                                <RiUserLine ></RiUserLine>
                                            </a>
                                            <div>
                                                {
                                                    cartCount > 0 ? <>
                                                        <a class="cart-toggle mobile-cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">{cartCount}</span></a>

                                                    </> : <>
                                                        <a class="cart-toggle mobile-cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">0</span></a>
                                                    </>
                                                }
                                            </div>

                                            <div>
                                                <i className="bi bi-list mobile-nav-toggle" data-bs-toggle="modal" data-bs-target="#leftModal"></i>
                                            </div>
                                        </div>
                                    </nav>
                                </>
                        }
                        {/* <!-- .navbar --> */}

                    </div>

                </header>
                <div className={`${searchhide ? "d-block" : "d-none"}`}>
                    <div className="web-search-result" id='web-search-result'>
                        <div className='web-search-result-child'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="web-search-result-child-close">
                                            <button type="button" class="btn-close" aria-label="Close" onClick={() => setsearchhide(false)}></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className='col-lg-6'>
                                        <div className='row'>

                                            <div className="col-lg-12 col-sm-12">
                                                <div className="web-search-product-data">
                                                    <h5 className='product-name'> Product Name</h5>
                                                    <ul>
                                                        {
                                                            searchwiseproduct.length > 0 ?
                                                                <>
                                                                    {searchwiseproduct.map((value, index) => (
                                                                        <>
                                                                            <li><a href={`/product/${value.product_slug}`}>{value.product_name}</a> </li>
                                                                        </>
                                                                    ))}
                                                                </>
                                                                : <>
                                                                    No Data Found
                                                                </>
                                                        }
                                                    </ul>

                                                </div>
                                            </div>
                                            {/* <div className="col-lg-12 col-sm-6">
                                            <div className="web-search-category-data">
                                                <h5 className='product-name'> Category Name</h5>
                                                <ul>
                                                    {
                                                        searchwisecategory.length > 0 ?
                                                            <>
                                                                {searchwisecategory.map((value, index) => (
                                                                    <>
                                                                        <li><a href=''>{value.cat_name}</a> </li>
                                                                    </>
                                                                ))}
                                                            </>
                                                            : <>
                                                                No Data Found
                                                            </>
                                                    }
                                                </ul>
                                            </div>
                                        </div> */}
                                        </div>
                                    </div>
                                    {searchwiseproduct.length > 0 ?
                                        <div className="col-lg-6">
                                            <div className="web-search-product-image">
                                                <h5 className='product-name'>
                                                    Product Image
                                                </h5>
                                                <a href={`/product/${searchwiseproduct[0]?.product_slug}`}>
                                                    <img class="" src={searchwiseproduct.length > 0 ? searchwiseImage + searchwiseproduct[0]?.product_image : constant.DEFAULT_IMAGE} alt="" />
                                                </a>

                                            </div>
                                        </div>
                                        : ''}
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div class="section-title"><a href="/product"><p>See All</p></a></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <!-- Left-aligned modal --> */}
                <div className="modal left fade" id="leftModal" tabindex="-1" role="dialog" aria-labelledby="leftModalLabel" aria-hidden="true">
                    <div className="modal-dialog navbar_model" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <a href="/"><img src={settingData != null ? setting_image_path + settingData.logo : constant.DEFAULT_IMAGE} alt="" className="img-fluid" /></a>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    {menudata.length > 0 ?
                                        menudata.map((value, index) => {
                                            return (
                                                <li key={index}><a className="nav-link scrollto" href={`/${value?.menu_slug ? value?.menu_slug : "/"}`}>{value?.menu_name} <i className="fa-solid fa-house"></i></a></li>
                                            )
                                        })
                                        : ''
                                    }


                                </ul>
                            </div>
                            <a className="modal-footer fw-5" href="https://paradise.nikkblink.site/csadmin/">
                                Admin Panel

                            </a>

                        </div>
                    </div>
                </div>
            </BrowserView>
            {
                showloginmodal && <LoginModal showloginmodal={showloginmodal} hideloginmodal={hideloginmodal} />
            }

            {/* <!-- End Header --> */}
            <MobileView>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center justify-content-between">
                        {
                            loading == false ? <>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <div>
                                        <Skeleton width={80} style={{ height: '33px' }}></Skeleton>
                                    </div>
                                    <div className='d-flex justify-content-between' style={{ gap: '30px' }}>
                                        {[...Array(2)].map((_, index) => (
                                            <>

                                                <Skeleton width={50} height={33}></Skeleton>
                                            </>
                                        ))}

                                    </div>
                                </div>
                            </> :
                                <>

                                    <div className="logo">
                                        {/* <h1 className="text-light"><a href="index.html"><span>Paradise</span></a></h1> */}
                                        {/* <!-- Uncomment below if you prefer to use an image logo --> */}
                                        <a href="/"><img src={settingData != null ? setting_image_path + settingData.logo : constant.DEFAULT_IMAGE} alt="" className="img-fluid" /></a>
                                    </div>
                                    <div className='web-search'>
                                        <input type="text" name='seachval' value={searchData.seachval} className='form-control required' placeholder='Search Product...' onChange={(e) => searchval(e)} />
                                    </div>
                                    <nav id="navbar" className="navbar">
                                        <ul>
                                            {menudata.length > 0 ?
                                                menudata.map((value, index) => {
                                                    return (
                                                        <li key={index}><a className={`nav-link scrollto`} href={`/${value?.menu_slug ? value?.menu_slug : "/"}`}>{value?.menu_name} <i className="fa-solid fa-house"></i></a></li>
                                                    )
                                                })
                                                : ''
                                            }


                                            {/* <li><a className="getstarted scrollto" href="https://paradise.nikkblink.site/csadmin/">Admin Panel</a></li> */}
                                            <li onClick={() => loginmodal()}>
                                                <a className='user-toggle' href='javascript:void(0)' >
                                                    <RiUserLine></RiUserLine>
                                                </a>
                                            </li>
                                            {
                                                cartCount > 0 ? <>
                                                    <li>
                                                        <a class="cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">{cartCount}</span></a>
                                                        {/* <a class="cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">{existingCartItems.length}</span></a> */}
                                                    </li>

                                                </> : <>
                                                    <li>
                                                        <a class="cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">0</span></a>
                                                    </li>
                                                </>
                                            }
                                        </ul>
                                        <div className='d-flex justify-content-center align-items-center g-3 '>
                                            <a className='user-toggle mobile-user-toggle' href='javascript:void(0)' onClick={() => loginmodal()}>
                                                <RiUserLine ></RiUserLine>
                                            </a>
                                            {
                                                cartCount > 0 ? <>
                                                    <a class="cart-toggle mobile-cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">{cartCount}</span></a>
                                                    {/* <a class="cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">{existingCartItems.length}</span></a> */}

                                                </> : <>
                                                    <a class="cart-toggle mobile-cart-toggle" href="/cart" title="cart"><i class="bx bx-cart"></i><span class="cart-count">0</span></a>
                                                </>
                                            }
                                            <i className="bi bi-list mobile-nav-toggle" data-bs-toggle="modal" data-bs-target="#leftModal"></i>
                                        </div>
                                    </nav>
                                </>
                        }
                        {/* <!-- .navbar --> */}

                    </div>

                </header>
                <div className={`${searchhide ? "d-block" : "d-none"}`}>
                    <div className="web-search-result" id='web-search-result'>
                        <div className='web-search-result-child'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="web-search-result-child-close">
                                            <button type="button" class="btn-close" aria-label="Close" onClick={() => setsearchhide(false)}></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className='col-lg-6'>
                                        <div className='row'>

                                            <div className="col-lg-12 col-sm-12">
                                                <div className="web-search-product-data">
                                                    <h5 className='product-name'> Product Name</h5>
                                                    <ul>
                                                        {
                                                            searchwiseproduct.length > 0 ?
                                                                <>
                                                                    {searchwiseproduct.map((value, index) => (
                                                                        <>
                                                                            <li><a href={`/product/${value.product_slug}`}>{value.product_name}</a> </li>
                                                                        </>
                                                                    ))}
                                                                </>
                                                                : <>
                                                                    No Data Found
                                                                </>
                                                        }
                                                    </ul>

                                                </div>
                                            </div>
                                            {/* <div className="col-lg-12 col-sm-6">
                                            <div className="web-search-category-data">
                                                <h5 className='product-name'> Category Name</h5>
                                                <ul>
                                                    {
                                                        searchwisecategory.length > 0 ?
                                                            <>
                                                                {searchwisecategory.map((value, index) => (
                                                                    <>
                                                                        <li><a href=''>{value.cat_name}</a> </li>
                                                                    </>
                                                                ))}
                                                            </>
                                                            : <>
                                                                No Data Found
                                                            </>
                                                    }
                                                </ul>
                                            </div>
                                        </div> */}
                                        </div>
                                    </div>
                                    {searchwiseproduct.length > 0 ?
                                        <div className="col-lg-6">
                                            <div className="web-search-product-image">
                                                <h5 className='product-name'>
                                                    Product Image
                                                </h5>
                                                <a href={`/product/${searchwiseproduct[0]?.product_slug}`}>
                                                    <img class="" src={searchwiseproduct.length > 0 ? searchwiseImage + searchwiseproduct[0]?.product_image : constant.DEFAULT_IMAGE} alt="" />
                                                </a>

                                            </div>
                                        </div>
                                        : ''}
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div class="section-title"><a href="/product"><p>See All</p></a></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <!-- Left-aligned modal --> */}
                <div className="modal left fade" id="leftModal" tabindex="-1" role="dialog" aria-labelledby="leftModalLabel" aria-hidden="true">
                    <div className="modal-dialog navbar_model" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <a href="/"><img src={settingData != null ? setting_image_path + settingData.logo : constant.DEFAULT_IMAGE} alt="" className="img-fluid" /></a>
                            </div>
                            <div className="modal-body">
                                <ul>
                                    {menudata.length > 0 ?
                                        menudata.map((value, index) => {
                                            return (
                                                <li key={index}><a className="nav-link scrollto" href={`/${value?.menu_slug ? value?.menu_slug : "/"}`}>{value?.menu_name} <i className="fa-solid fa-house"></i></a></li>
                                            )
                                        })
                                        : ''
                                    }


                                </ul>
                            </div>
                            <a className="modal-footer fw-5" href="https://paradise.nikkblink.site/csadmin/">
                                Admin Panel

                            </a>

                        </div>
                    </div>
                </div>
            </MobileView>
        </>
    )
}

export default Header