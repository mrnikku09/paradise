import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ModalBody, ModalHeader, ToastContainer } from 'react-bootstrap'
import { ApiService } from '../Services/apiservices'
import constant from '../Services/constant'
import LoginModal from './login_model'
import Toasts from '../Extension/Toast/Toasts'
import { useNavigate } from 'react-router-dom'


const RegisterModel = ({ showregister, hideregistermodal }) => {
    const [settingData, setsettingData] = useState('')
    const [settingimagepath, setsettingimagepath] = useState('')
    const [registershow, setregistershow] = useState(showregister)
    const [buttondisabled, setbuttondisabled] = useState(true)
    const navigate = useNavigate()

    const didMountRef = useRef(true)
    const [userdetails, setuserdetails] = useState({
        user_fname: '',
        user_email: '',
        user_mobile: '',
        user_password: '',
    });
    useEffect(() => {
        if (didMountRef.current) {
            getsettingData();
        }
        didMountRef.current = false
    }, [])
    const getsettingData = () => {
        ApiService.fetchData('settingsData').then((res) => {
            if (res.status === 'success') {
                setsettingData(res?.settings)
                setsettingimagepath(res.setting_image_path)
                // console.log(res?.setting_image_path)
            }
        })
    }

    const ontodochange = (e) => {
        const { value, name } = e.target;
        setuserdetails((login) => ({
            ...login,
            [name]: value
        }))
        // console.log(userdetails)

        let counter = 0;
        let myElements = document.getElementsByClassName('requires');



        for (let i = 0; i < myElements.length; i++) {
            if (myElements[i].value == '') {
                counter++;
                setbuttondisabled(true)
            }

        }
        if (counter == 0) {
            setbuttondisabled(false)

        }
    }
    function isValidNumber(contact_mobile) {
        return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(contact_mobile);
    }
    const registersubmit = () => {
        const validateEmail = (email) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        };

        if (!validateEmail(userdetails.user_email)) {
            Toasts.error('Email is Invalid')
            return false
        }

        if (!isValidNumber(userdetails.user_mobile)) {
            Toasts.error('Please enter a valid Mobile Number')
            return false;
        }
        const datastring = {
            'user_fname': userdetails.user_fname,
            'user_mobile': userdetails.user_mobile,
            'user_email': userdetails.user_email,
            'user_password': userdetails.user_password,
        }
        ApiService.postData('register-process', datastring).then((res) => {
            if (res.status === 'success') {
                // Toasts.success(res.message)
                localStorage.setItem('USER_SESSION', JSON.stringify(res.userData.user_token))
                Toasts.success(res.message)
                setTimeout(() => {
                    navigate('/')
                    window.location.reload()
                }, 3000);
            } else {
                Toasts.error(res.message)
            }
        })
    }

    console.log(showregister)
    const [showloginmodal, setshowloginmodal] = useState(false);
    const loginmodal = () => {
        setregistershow(!registershow)
        setshowloginmodal(!showloginmodal);

    }
    const hideloginmodal = () => {
        setshowloginmodal(!showloginmodal);
    }
    return (
        <>
            <Modal show={registershow} onHide={hideregistermodal} className="fade custom-modal modal-lg login_modal">
                <Modal.Header closeButton>
                    <Modal.Title className='h6' id="modalLabel">User Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="login_content">
                        <div className="login_img">
                            <img src={settingData?.logoo ? settingimagepath + settingData?.logoo : constant.Logo} alt="" />
                            <h6 className="my-2">User Register</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="login_form mb-4">
                                <div className="container">
                                    <div className="row g-3">

                                        <div className="col-lg-6">
                                            <div className="form-group-dark">
                                                {/* <label>Your Email</label> */}
                                                <input name="user_fname" type="text" placeholder="Enter your Name" value={userdetails.user_fname} className="form-control requires" id="user_fname" onChange={(e) => ontodochange(e)} />

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group-dark">
                                                {/* <label>Your Password</label> */}
                                                <input name="user_mobile" type="number" placeholder="Enter your Mobile Number" value={userdetails.user_mobile} className="form-control requires" onChange={(e) => ontodochange(e)} />

                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group-dark">
                                                {/* <label>Your Email</label> */}
                                                <input name="user_email" type="email" placeholder="Enter your Email" value={userdetails.user_email} className="form-control requires" id="user_email" onChange={(e) => ontodochange(e)} />

                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group-dark">
                                                {/* <label>Your Password</label> */}
                                                <input name="user_password" type="password" placeholder="Enter your Password" value={userdetails.user_password} className="form-control requires" onChange={(e) => ontodochange(e)} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container mt-3">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="login-submit">
                                                <button className="btn btn-primary btn-medium btn btn-primary login_submit" disabled={buttondisabled} onClick={registersubmit}>Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-title">
                            <p>
                                <a href="javascript:void(0)" onClick={loginmodal}>Log In</a>
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {
                showloginmodal && <LoginModal showloginmodal={showloginmodal} hideloginmodal={hideloginmodal} />
            }
        </>
    )
}

export default RegisterModel