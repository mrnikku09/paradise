import React, { useEffect, useRef, useState } from 'react'
import { ApiService } from '../Services/apiservices';
import Toasts from '../Extension/Toast/Toasts';
import { ToastContainer } from 'react-toastify';

const Contactus = () => {
    const [settingData, setsettingData] = useState('');
    const [settingImageUrl, setsettingImageUrl] = useState({});

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
            
            ApiService.fetchData('settingsData').then((res) => {
                if (res.status == "success") {
                    setsettingData(res?.settings);
                    setsettingImageUrl(res?.setting_image_path);
                }
            })
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
            {/* <!-- ======= Contact Us Section ======= --> */}
            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                        <h2>Contact Us</h2>
                        <p>Contact us the get started</p>
                    </div>
                    <div className="row">
                                    <ToastContainer />
                                </div>
                    <div className="row">

                        <div className="col-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                            <div className="info">
                                <div className="address">
                                    <i className="bi bi-geo-alt"></i>
                                    <h4>Location:</h4>
                                    <p>Jaipur Rajasthan</p>
                                </div>

                                <div className="email">
                                    <i className="bi bi-envelope"></i>
                                    <h4>Email:</h4>
                                    <p>{settingData.admin_support_email}</p>
                                </div>

                                <div className="phone">
                                    <i className="bi bi-phone"></i>
                                    <h4>Call:</h4>
                                    <p>{settingData.admin_mobile}</p>
                                </div>

                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                                    frameborder="0" style={{ border: "0", width: "100%", height: "290px" }} allowfullscreen></iframe>
                            </div>

                        </div>

                        <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                            <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label for="name">Your Name</label>
                                        <input type="text" name="contact_name" value={contactDetails.contact_name} onChange={(e) => onTodoChange(e)}  className="form-control required" id="name" placeholder="Your Name" required />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="name">Your Moblie</label>
                                        <input type="number" name="contact_mobile" value={contactDetails.contact_mobile} onChange={(e) => onTodoChange(e)} className="form-control required" id="name" placeholder="Your Mobile" required />
                                    </div>
                                    <div className="form-group col-md-12 mt-3 mt-md-0">
                                        <label for="name">Your Email</label>
                                        <input type="email" className="form-control required" name="contact_email" id="email" value={contactDetails.contact_email} onChange={(e) => onTodoChange(e)} placeholder="Your Email" required />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <label for="name">Subject</label>
                                    <input type="text" className="form-control required" name="contact_subject" id="subject" placeholder="Subject" value={contactDetails.contact_subject} onChange={(e) => onTodoChange(e)}  required />
                                </div>
                                <div className="form-group mt-3">
                                    <label for="name">Message</label>
                                    <textarea className="form-control" name="contact_message" rows="10" onChange={(e) => onTodoChange(e)} value={contactDetails.contact_message} required></textarea>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your message has been sent. Thank you!</div>
                                </div>
                                <div className="text-center"><button className="btn btn-primary btn-medium btn btn-primary" type="button" onClick={contactProcess}>Send Message</button></div>
                            </form>
                        </div>

                    </div>

                </div>
            </section>
            {/* <!-- End Contact Us Section --> */}
        </>
    )
}

export default Contactus