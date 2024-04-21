// import { Modal } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";


const QuickViewModal = ({ showmodal, handleClose }) => {

    const [showQuick, setShowQuick] = useState(showmodal);
    // const [handleClose, sethandleClose] = useState('');
    const hide = () => {
        setShowQuick(false);
    }
    const onhide = () => {
        setShowQuick(false);
    }
    return (
        <>
            {/* <div className={`modal ${showQuick ? 'show':''} fade custom-modal product_modal`} id="productview" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true"> */}
            <Modal show={showQuick} onHide={handleClose} className="fade custom-modal product_modal modal-lg product_modal_dialog">
                {/* <div className="modal-dialog modal-lg product_modal_dialog" role="document"> */}
                <div className="modal-content product_modal_content">
                    <Modal.Header closeButton>
                        <Modal.Title id="modalLabel">Product Name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="product_modal_gallery_row">
                            <div className="product_modal_gallery">
                                <img src="assets/img/portfolio/portfolio-9.jpg" alt="Product" className='img-fluid' />
                            </div>
                            <div className="product_modal_content px-4">
                                <h6>This is the product name</h6>
                                <p>Description of the product goes here.</p>
                                {/* <button variant="primary" className='btn btn-primary btn-medium btn btn-primary'>Add to Cart</button> */}
                            </div>
                        </div>
                    </Modal.Body>
                </div>
                {/* </div> */}
            </Modal>
        </>
    )
}

export default QuickViewModal