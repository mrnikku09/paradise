import React, { useEffect, useRef, useState } from 'react'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';

const Header = () => {
    const [settingData, setsettingData] = useState();
    const [setting_image_path, setsetting_image_path] = useState();

    const [menudata, setmenudata] = useState([]);
    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData('settingsData').then((res) => {
                if (res.status == "success") {
                    setsettingData(res?.settings);
                    setsetting_image_path(res?.setting_image_path);
                }
            })
            ApiService.fetchData('menu').then((res) => {
                if (res.status == "success") {
                    setmenudata(res?.menuData);
                }
            })
        }
        didMountRef.current = false;
    }, [])
    return (
        <>
            {/* <!-- ======= Header ======= --> */}
            <header id="header" className="fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">

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
                                        <li key={index}><a className="nav-link scrollto" href={value?.menu_slug ? value?.menu_slug : "/"}>{value?.menu_name} <i className="fa-solid fa-house"></i></a></li>
                                    )
                                })
                                : ''
                            }


                            <li><a className="getstarted scrollto" href="https://paradise.nikkblink.site/csadmin/">Admin Panel</a></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" data-bs-toggle="modal" data-bs-target="#leftModal"></i>
                    </nav>
                    {/* <!-- .navbar --> */}

                </div>
            </header>
            {/* <!-- Left-aligned modal --> */}
            <div className="modal left fade" id="leftModal" tabindex="-1" role="dialog" aria-labelledby="leftModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <a href="/"><img src={settingData != null ? setting_image_path + settingData.logo : constant.DEFAULT_IMAGE} alt="" className="img-fluid" /></a>
                        </div>
                        <div className="modal-body">
                            <ul>
                                {menudata.length > 0 ?
                                    menudata.map((value, index) => {
                                        return (
                                            <li key={index}><a className="nav-link scrollto" href={value?.menu_slug ? value?.menu_slug : "/"}>{value?.menu_name} <i className="fa-solid fa-house"></i></a></li>
                                        )
                                    })
                                    : ''
                                }


                            </ul>
                        </div>
                        <a className="modal-footer" href="https://paradise.nikkblink.site/csadmin/">
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