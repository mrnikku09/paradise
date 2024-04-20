import React, { useEffect, useRef, useState } from 'react'
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';

const Footer = () => {

    const [settingData, setsettingData] = useState('');
    const [setting_image_path, setsetting_image_path] = useState();

    const [footer_desc1, setfooter_desc1] = useState('');
    const [footer_desc2, setfooter_desc2] = useState('');
    const [footer_desc3, setfooter_desc3] = useState('');
    const [footer_desc4, setfooter_desc4] = useState('');
    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData('settingsData').then((res) => {
                if (res.status == "success") {
                    setsettingData(res?.settings);
                    setsetting_image_path(res?.setting_image_path);
                }
            })
            ApiService.fetchData('footer').then((res) => {
                if (res.status == "success") {
                    setfooter_desc1(res?.footerData?.footer_desc1);
                    setfooter_desc2(res?.footerData?.footer_desc2);
                    setfooter_desc3(res?.footerData?.footer_desc3);
                    setfooter_desc4(res?.footerData?.footer_desc4);
                }
            })
        }
        didMountRef.current = false;
    }, [])
    return (
        <>
            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer">

                <div className="footer-newsletter">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h4>Join Our Newsletter</h4>
                                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                <form action="" method="post">
                                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <img className='' src={settingData != null ? setting_image_path + settingData.logo : constant.DEFAULT_IMAGE} alt="" />
                                <p>
                                    A108 Adam Street <br />
                                    New York, NY 535022<br />
                                    United States <br /><br />
                                    <strong>Phone:</strong>&nbsp;<a href={"tel:" + settingData?.admin_mobile}>9999999999</a> <br />
                                    <strong>Email:</strong>&nbsp;<a href={"mailto:" + settingData?.site_address}>info@paradise.com</a><br />
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links" dangerouslySetInnerHTML={{ __html: footer_desc2 }}>
                            
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links" dangerouslySetInnerHTML={{ __html: footer_desc3 }}>
                            
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Social Networks</h4>
                                <p>You Can Follow Us On</p>
                                <div className="social-links mt-3">
                                    {settingData.twitter_url != null ? (
                                        <a href={settingData.twitter_url} className="twitter"><i className="bx bxl-twitter"></i></a>
                                    ) : ('')}
                                    {settingData.facebook_url != null ? (
                                        <a href={settingData.facebook_url} className="facebook"><i className="bx bxl-facebook"></i></a>
                                    ) : ('')}
                                    {settingData.instagram_url != null ? (
                                        <a href={settingData.instagram_url} className="instagram"><i className="bx bxl-instagram"></i></a>
                                    ) : ('')}
                                    {settingData.linkedin_url != null ? (
                                        <a href={settingData.linkedin_url} className="google-plus"><i className="bx bxl-linkedin"></i></a>
                                    ) : ('')}


                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                    <div className="copyright ">
                <div className="container py-4 text-center">
                        &copy; Copyright <strong><span>Paradise</span></strong>. All Rights Reserved
                    </div>

                </div>
            </footer>
            {/* <!-- End Footer --> */}
        </>
    )
}

export default Footer