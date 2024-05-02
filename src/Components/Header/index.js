import React, { useContext, useEffect, useRef, useState } from 'react'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import DataContext from '../Context';

const Header = () => {
    const [settingData, setsettingData] = useState();
    const [setting_image_path, setsetting_image_path] = useState();
    const [loading, setloading] = useState('');
    const location = useLocation();
    const [cartsesssion, setcartsesssion] = useState('')
    const{cartCount,setcartCount}=useContext(DataContext)


    const cartsessiondata = localStorage.getItem('CART_SESSION')
    // console.log(cartsessiondata)
    const existingCartItems = cartsessiondata ? JSON.parse(cartsessiondata) : []
    // console.log(existingCartItems)


    const [menudata, setmenudata] = useState([]);
    const didMountRef = useRef(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (didMountRef.current) {
            setloading(false);

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
    const gotToPage = (route) => {
        navigate(route);
    };
    return (
        <>
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

            {/* <!-- End Header --> */}
        </>
    )
}

export default Header