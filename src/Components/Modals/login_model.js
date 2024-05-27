import Modal from "react-bootstrap/Modal";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ModalBody, ModalHeader, ToastContainer } from 'react-bootstrap'
import constant from "../Services/constant";
import Toasts from "../Extension/Toast/Toasts";
import { ApiService } from "../Services/apiservices";
import DataContext from "../Context";
import { Navigate, useNavigate } from "react-router-dom";
import RegisterModel from "./register_model";

const LoginModal = ({ showloginmodal, hideloginmodal }) => {
    const [showmodal, setShowmodal] = useState(showloginmodal)
    const [buttondisabled, setbuttondisabled] = useState(true)
    const { existingUserSession } = useContext(DataContext)
    // console.log(existingUserSession)
    const [logindetails, setlogindetails] = useState({
        user_email: '',
        user_password: '',
    });
    const [loginData, setlogindata] = useState('')
    const [settingData, setsettingData] = useState('')
    const [settingimagepath, setsettingimagepath] = useState('')
    const didMountRef = useRef(true)
    const navigate = useNavigate()

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
        setlogindetails((login) => ({
            ...login,
            [name]: value
        }))
        // console.log(logindetails)

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
    const loginsumbit = () => {
        const validateEmail = (email) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        };

        if (!validateEmail(logindetails.user_email)) {
            Toasts.error('Email is Invalid')
            return false
        }
        const datastring = {
            'user_email': logindetails.user_email,
            'user_password': logindetails.user_password,
        }
        ApiService.postData('user-login', datastring).then((res) => {
            if (res.status === 'success') {
                setlogindata(res.userData)
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


    const [showregister, setshowregister] = useState(false)
    const userregister = () => {
        setShowmodal(!showmodal)
        setshowregister(!showregister)
    }
    const hideregistermodal=()=>{
        setshowregister(!showregister)

    }
    return (
        <>
            <Modal show={showmodal} onHide={hideloginmodal} className="fade custom-modal modal-lg login_modal">
                <Modal.Header closeButton>
                    <Modal.Title className='h6' id="modalLabel">User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="login_content">
                        <div className="login_img">
                            <img src={settingData?.logoo ? settingimagepath + settingData?.logoo : constant.Logo} alt="" />
                            <h6 className="mt-2">User Login</h6>
                            <p>For Better Experience, Order tracking & Regular updates</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="login_form mb-4">
                                <div className="container">
                                    <div className="row g-3">

                                        <div className="col-12">
                                            <div className="form-group-dark">
                                                {/* <label>Your Email</label> */}
                                                <input name="user_email" type="email" placeholder="Enter your Email" value={logindetails.user_email} className="form-control requires" id="user_email" onChange={(e) => ontodochange(e)} />

                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group-dark">
                                                {/* <label>Your Password</label> */}
                                                <input name="user_password" type="password" placeholder="Enter your Password" value={logindetails.user_password} className="form-control requires" onChange={(e) => ontodochange(e)} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container mt-3">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="login-submit">
                                                <button className="btn btn-primary btn-medium btn btn-primary login_submit" disabled={buttondisabled} onClick={loginsumbit}>Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-title">
                            <p>
                                <a href="javascript:void(0)" onClick={userregister}>Register Now</a>
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {
                showregister&& <RegisterModel showregister={showregister} hideregistermodal={hideregistermodal}/>
            }
        </>
    )
}

export default LoginModal