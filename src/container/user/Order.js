import React from 'react'
import Footer from '../../Components/Footer'
import Header from '../../Components/Header'
import User from './User'

const Order = () => {
    return (
        <>
            <main id="main">

                <Header />
                <div className="subheader">
                    <div className="subheader-overlay"></div>
                    <div className="subheader-content">
                        <h1>Order</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item" aria-current="page">Order</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <section className='sec-pad'>
                    <div className="container">
                        <div className="row g-3">
                            <User />
                            <div className="col-lg-8">
                                <div className="text-center">
                                    <h6> No Data Found</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}

export default Order