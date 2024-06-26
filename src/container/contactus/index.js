import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { ApiService } from '../../Components/Services/apiservices';
import constant from '../../Components/Services/constant';
import { Helmet } from 'react-helmet';
import Toasts from '../../Components/Extension/Toast/Toasts';
import { ToastContainer, toast } from 'react-toastify';

const Contactus = () => {

    const [pageData, setPageData] = useState({});
    const [pageImageUrl, setPageImageUrl] = useState({});
    const [pageContent, setPag5mmeContent] = useState("");
    const [contactDetails, setContactDetails] = useState({
        contact_name: '',
        contact_email: '',
        contact_subject: '',
        contact_message: '',
        contact_mobile: '',
    })
    const [successmsg, setsuccessmsg] = useState('');
    const [errormsg, seterrormsg] = useState('');
    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            const getPageData = {
                page_url: 'contact-us',
            }
            ApiService.postData('page', getPageData).then((res) => {
                if (res.status === 'success') {
                    setPageData(res?.pageData);
                    setPageImageUrl(res?.PAGE_IMAGE_URL);
                }
            });
        }
        didMountRef.current = false
    }, [])

    const onTodoChange = (e) => {
        const { name, value } = e.target;
        setContactDetails((prestate) => ({
            ...prestate,
            [name]: value,
        }))
    }

    const contactProcess = () => {
        let counter = 0;
        let myElements = document.getElementsByClassName('required');

        for (let i = 0; i < myElements.length; i++) {
            if (myElements[i].value == '') {
                myElements[i].style.border = "1px solid red";
                counter++;
            }
            else {
                myElements[i].style.border = "";
            }
        }
        if (counter != 0) {
            Toasts.error('Please Fill The Required Fields')
            return false;
        }

        const validateEmail = (email) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        };

        if (!validateEmail(contactDetails.contact_email)) {
            Toasts.error('Email is Invalid')
            return false
        }

        const dataString = {
            'contact_name': contactDetails.contact_name,
            'contact_email': contactDetails.contact_email,
            'contact_subject': contactDetails.contact_subject,
            'contact_message': contactDetails.contact_message,
            'contact_mobile': contactDetails.contact_mobile
        }
        ApiService.postData('contact-process', dataString).then((res) => {
            if (res.status === 'success') {
                Toasts.success(res.message);
                setTimeout(() => {
                    window.location.reload();
                }, 4000);
            } else {
                Toasts.error(res.message);

            }
        })
    }


    return (
        <>
            <Helmet>
                <title>{pageData.page_meta_title}</title>
                <meta name="description" itemprop="description" content={pageData.page_meta_desc != null ? pageData.page_meta_desc : "Paradise"} />
                {pageData.page_meta_keyword != null ? <meta name="keywords" content={pageData.page_meta_keyword} /> : ""}
                <link rel="canonical" href={window.location.href} />
                <meta property="og:title" content={pageData.page_meta_title} />
                <meta name="twitter:url" content={window.location.href} />
                <meta property="og:image" content={constant.FRONT_URL + 'img/logo.png'} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:description" content={pageData.page_meta_desc != null ? pageData.page_meta_desc : "Paradise"} />
                <meta name="twitter:title" content={pageData.page_meta_title} />
                <meta name="twitter:description" content={pageData.page_meta_desc != null ? pageData.page_meta_desc : "Paradise"} />
                <meta property="twitter:image" content={constant.FRONT_URL + 'img/logo.png'} />
            </Helmet>

            <main id="main">
                <Header />
                <div className="subheader" style={{ background: `url(${pageData?.page_header_image != null ? pageImageUrl + pageData?.page_header_image : ''})` }}>
                    <div className="subheader-overlay"></div>
                    <div className="subheader-content">
                        <h1>Contact Us</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item" aria-current="page">Contact Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>


                <section className="sec-pad contact_us">
                    <div className="container">
                        <div className="row g-3">
                            <div className="col-lg-7">
                                <div className=""><h2 >Get In Touch With Us</h2><p>If you have any questions or enquiries please feel free to contact us alternatively you can complete our online enquiry form located below and we will get back to you as soon as possible.</p></div>
                                <div className="row">
                                    <ToastContainer />
                                </div>
                                <div className="row g-3">
                                    <div className="col-lg-6">
                                        <div className="form-group-dark">
                                            <label>Your Name</label>
                                            <input type="text" name="contact_name" className="form-control required" placeholder="Name" value={contactDetails.contact_name} onChange={(e) => onTodoChange(e)} /></div></div>
                                    <div className="col-lg-6">
                                        <div className="form-group-dark">
                                            <label>Mobile</label>
                                            <input type="number" name="contact_mobile" className="form-control required" placeholder="Mobile" value={contactDetails.contact_mobile} onChange={(e) => onTodoChange(e)} /></div></div>
                                    <div className="col-lg-12">
                                        <div className="form-group-dark">
                                            <label>Email Address</label>
                                            <input type="email" name="contact_email" className="form-control required" placeholder="Email" value={contactDetails.contact_email} onChange={(e) => onTodoChange(e)} /></div></div>
                                    <div className="col-lg-12">
                                        <div className="form-group-dark">
                                            <label>Subject</label>
                                            <input type="text" name="contact_subject" className="form-control required" placeholder="Subject" value={contactDetails.contact_subject} onChange={(e) => onTodoChange(e)} /></div></div>
                                    <div className="col-lg-12">
                                        <div className="form-group-dark">
                                            <label>Message</label><textarea name="contact_message" onChange={(e) => onTodoChange(e)} value={contactDetails.contact_message} className="form-control " /></div></div>
                                    <div className="col-lg-6"><button onClick={contactProcess} type="button" className="btn btn-primary btn-medium btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-5">
                                <div className="contact-address-section mb-3">
                                    <div className="">
                                        <h3>Head Office</h3></div>
                                    <div className="address-contact">
                                        <ul>
                                            <li><a href="" target="new"><i className="bx bx-current-location mr-5"></i><span>Jagatpura,Jaipur</span></a></li>
                                            <li><a href="tel:+919874563210"><i className="bx bxs-contact mr-5"></i><span>+919874563210</span></a>
                                            </li>
                                            <li><a href="tel:9876543210"><i className="bx bxs-contact mr-5"></i><span>9876543210</span></a>
                                            </li></ul></div></div>
                                <div className="contact-address-section mb-3">
                                    <div className=""><h3>Email</h3></div>
                                    <div className="address-contact"><ul>
                                        <li><a href="mailto:info@paradise.com"><i className="bx bx-voicemail mr-5"></i><span>info@paradise.com</span></a>
                                        </li>
                                        <li><a href="mailto:paradise@gmail.com"><i className="bx bx-voicemail mr-5"></i><span>paradise@gmail.com</span></a>
                                        </li>
                                        <li><a href="mailto:paradise@yahoo.co.in"><i className=" bx bx-voicemail mr-5"></i><span>paradise@yahoo.co.in</span></a>
                                        </li></ul></div></div></div></div></div></section>
                {/* <section className="breadcrumbs ">
                    
                    <div className="container">

                        <div className="d-flex justify-content-between align-items-center">
                            <h2>{pageData?.page_name}</h2>
                            <ol>
                                <li><a href="index.html">Home</a></li>
                                <li>{pageData?.page_name}</li>
                            </ol>
                        </div>

                    </div>
                </section>

                <section className="inner-page">
                    <div className="container">
                        <p>
                            Example inner page template
                        </p>
                    </div>
                </section> */}
                <Footer />
            </main>

        </>
    )
}

export default Contactus