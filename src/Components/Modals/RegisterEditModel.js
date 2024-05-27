import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ModalBody, ModalHeader, ToastContainer } from 'react-bootstrap'

import { ApiService } from '../Services/apiservices'
import constant from '../Services/constant'
import Toasts from '../Extension/Toast/Toasts'
import { useNavigate } from 'react-router-dom'


const RegisterEditModel = ({ showregister, hideregistermodal, userData }) => {
    const [registerData, setregisterData] = useState(userData)
    const [registershow, setregistershow] = useState(showregister)
    const [settingData, setsettingData] = useState('')
    const [settingimagepath, setsettingimagepath] = useState('')
    const [buttondisabled, setbuttondisabled] = useState(true)

    const didMountRef = useRef(true)

    console.log(userData)

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
                                                <input name="user_fname" type="text" placeholder="Enter your Name" value={registerData.user_fname} className="form-control requires" id="user_fname" />

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group-dark">
                                                {/* <label>Your Password</label> */}
                                                <input name="user_mobile" type="number" placeholder="Enter your Mobile Number" value={registerData.user_mobile} className="form-control requires" />

                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group-dark">
                                                {/* <label>Your Email</label> */}
                                                <input name="user_email" type="email" placeholder="Enter your Email" value={registerData.user_email} className="form-control requires" id="user_email" />

                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group-dark">
                                                {/* <label>Your Password</label> */}
                                                <input name="user_password" type="password" placeholder="Enter your Password" value={registerData.user_password} className="form-control requires" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container mt-3">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="login-submit">
                                                <button className="btn btn-primary btn-medium btn btn-primary login_submit" disabled={buttondisabled} >Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RegisterEditModel