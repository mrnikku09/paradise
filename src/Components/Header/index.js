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
            ApiService.fetchData('settingsdata').then((res) => {
                if (res.status == "success") {
                    console.log(res.settingData);
                    setsettingData(res?.settingData);
                    setsetting_image_path(res?.setting_image_path);
                }
            })
            ApiService.fetchData('menuData').then((res) => {
                if (res.status == "success") {
                    console.log(res);
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
                            {menudata.length>0 ?
                                menudata.map((value, index) => {
                                    return (
                                        <li key={index}><a className="nav-link" href={value?.menu_customlink}>{value?.menu_name} <i className="fa-solid fa-house"></i></a></li>
                                    )
                                })
                                :''
                            }

                            
                            <li><a className="getstarted scrollto" href="javascript:void(0)">Get Started</a></li> 
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                    {/* <!-- .navbar --> */}

                </div>
            </header>
            {/* <!-- End Header --> */}
        </>
    )
}

export default Header