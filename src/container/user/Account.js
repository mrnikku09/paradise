import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import RegisterEditModel from '../../Components/Modals/RegisterEditModel'
import User from './User'
import { ApiService } from '../../Components/Services/apiservices'
import Skeleton from 'react-loading-skeleton'

const Account = () => {
    const didMountRef = useRef(true)
    const [userData, setUserData] = useState('')
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (didMountRef.current) {
            setloading(true)
            userdetails();
        }
        didMountRef.current = false;
    }, [])

    const userdetails = () => {
        ApiService.fetchData('getuserdata').then((res) => {
            if (res.status === 'success') {
                setUserData(res.userData)
                setloading(false)
            }
        })
    }

    const [showregister, setshowregister] = useState(false)
    const registerEditModel = () => {
        setshowregister(!showregister);

    }
    const hideregistermodal = () => {
        setshowregister(!showregister);
    }

    return (
        <>
            <main id="main">

                <Header />
                <div className="subheader">
                        <div className="subheader-overlay"></div>
                        <div className="subheader-content">
                            <h1>Account</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item" aria-current="page">Account</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                <section className='sec-pad'>
                    <div className="container">
                        <div className="row g-3">
                            <User />
                            <div className="col-lg-8">
                                {
                                    loading ?
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12 text-center">
                                                    <Skeleton width={200} height={50} />
                                                    <hr />
                                                </div>
                                            </div>
                                            {[...Array(3)].map((index, _) => (
                                                <div className="row g-3">
                                                    <div className="col-lg-12 text-center">
                                                        <Skeleton style={{ width: '100%' }} height={30} />

                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                        : <>

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-12 text-center">
                                                        <h2>Hello, {userData?.user_fname}</h2>
                                                        <hr />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <h6>Your Information </h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        Name
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>{userData?.user_fname}</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        Mobile No.
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>{userData?.user_mobile}</h6>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        Email
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>{userData?.user_email}</h6>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="container mt-5">
                                                <div className="row">
                                                    <div className="col-lg-12 text-center">
                                                        <a href='javascript:void(0)' onClick={registerEditModel}><h6>Edit Details</h6></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                 {
                    showregister && <RegisterEditModel showregister={showregister} hideregistermodal={hideregistermodal} userData={userData} />

                } 
                <Footer />
            </main>
        </>
    )
}

export default Account