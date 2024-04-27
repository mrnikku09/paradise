import React, { useEffect, useRef, useState } from 'react'
import Toasts from '../Extension/Toast/Toasts'
import { ToastContainer } from 'react-toastify'
import { ApiService } from '../Services/apiservices'

const Newsletter = () => {
    const [newsData, setNewsData] = useState({
        newsletter_email: ''
    })
    const didMountRef = useRef(true)

    useEffect(() => {
        if (didMountRef.current) {

        }
    })

    const ontodochange = (e) => {
        // console.log(e)
        const { name, value } = e.target

        setNewsData((allvalue) => ({
            ...allvalue, [name]: value
        }))
    }

    const subcribeProcess = () => {
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
            console.log('res')
            Toasts.error('Please Fill The Required Fields')
            return false;
        }

        const validateEmail = (email) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        };

        if (!validateEmail(newsData.newsletter_email)) {
            Toasts.error('Email is Invalid')
            return false
        }

        if (counter == 0) {
            const dataString = {
                'newsletter_email': newsData.newsletter_email,
               
            }
            ApiService.postData('newsletter', dataString).then((res) => {
                if (res.status === 'success') {
                    Toasts.success(res.message);
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 4000);
                } else {
                    Toasts.error(res.message);

                }
            })
        }
    }

    return (
        <>
            <div id="footer">

                <ToastContainer />
                <div className="footer-newsletter">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <h4>Join Our Newsletter</h4>
                                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                <div className='d-flex justify-content-center align-items-center form-group'>
                                    <input type="email" name="newsletter_email" className='form-control required' value={newsData.newsletter_email} onChange={(e) => ontodochange(e)} />
                                    <button type='button' className='btn btn-primary btn-medium btn btn-primary' onClick={subcribeProcess}>Subscribe</button>
                                </div>
                                {/* <form action="" method="post" className='form-group '>
                                    <input type="email" name="email" className='form-control'/><input type="submit" value="Subscribe" />
                                </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newsletter