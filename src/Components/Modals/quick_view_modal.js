// import { Modal } from 'bootstrap';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";


const QuickViewModal = ({ showmodal }) => {

    const [showQuick, setShowQuick] = useState(showmodal);
    const hide = () => {
        setShowQuick(false);
    }
    return (
        <>
            {/* <div class={`modal ${showQuick ? 'show':''} fade custom-modal product_modal`} id="productview" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true"> */}
            <Modal show={showQuick} className="fade custom-modal product_modal">
                <div class="modal-dialog product_modal_dialog" role="document">
                    <div class="modal-content product_modal_content">
                        {/* <div class="modal-header product_modal_header">
                            <h5 class="modal-title product_modal_title" id="modalLabel">Product Name</h5>
                            <button type="button" className="close" onClick={hide}>
                                <span>&times;</span>
                            </button>
                        </div> */}
                        <div class="modal-body product_modal_body">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="product_modal_gallery">
                                        <img src="assets/img/portfolio/portfolio-9.jpg" alt="" className='w-100' />
                                    </div>

                                </div>
                                <div className="col-lg-6 col-12">
                                    <h6>this is name</h6>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            {/* </div> */}
        </Modal>
        </>
    )
}

export default QuickViewModal