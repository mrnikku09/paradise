import React, { useEffect, useRef, useState } from 'react'
import { ApiService } from '../Services/apiservices';
import Skeleton from 'react-loading-skeleton';

const Faq = () => {
    const [faqData, setfaqData] = useState([]);
    const [loading, setloading] = useState(false);

    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            ApiService.fetchData('faq').then((res) => {
                if (res.status == "success") {
                    setfaqData(res?.faqData);
                    setloading(true)

                }
            })

        }
        didMountRef.current = false;
    }, [])
    return (
        <>
            {/* <!-- ======= F.A.Q Section ======= --> */}
            <section id="faq" className="faq section-bg">
                <div className="container" >

                    <div className="section-title">
                        <h2>F.A.Q</h2>
                        <p>Frequently Asked Questions</p>
                    </div>

                    <ul className="faq-list"  >
                        {
                            loading == false ? <>
                                    
                                    <div className='' style={{ gap: '50px' }}>
                                        {[...Array(5)].map((_, index) => (
                                            <>

                                                <Skeleton style={{width:'100%'}} height={33}></Skeleton>
                                            </>
                                        ))}

                                </div>
                            </> : <>
                                {
                                    faqData.length > 0 ?
                                        faqData.map((value, index) => (
                                            <>
                                                <li key={index}>
                                                    <div data-bs-toggle="collapse" className="collapsed question" href={`#faq${value.faq_id}`}>{value.faq_title} <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                                                    <div id={`faq${value.faq_id}`} className="collapse" data-bs-parent=".faq-list">
                                                        <div dangerouslySetInnerHTML={{ __html: value.faq_description }}></div>
                                                    </div>
                                                </li>
                                            </>
                                        ))
                                        : ''
                                }
                            </>}



                        {/* <li>
                            <div data-bs-toggle="collapse" className="collapsed question" href="#faq1">Non consectetur a erat nam at lectus
                                urna duis? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                            <div id="faq1" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur
                                    gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq2" className="collapsed question">Feugiat scelerisque varius morbi enim
                                nunc faucibus a pellentesque? <i className="bi bi-chevron-down icon-show"></i><i
                                    className="bi bi-chevron-up icon-close"></i></div>
                            <div id="faq2" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id
                                    donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit
                                    ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq3" className="collapsed question">Dolor sit amet consectetur adipiscing
                                elit pellentesque habitant morbi? <i className="bi bi-chevron-down icon-show"></i><i
                                    className="bi bi-chevron-up icon-close"></i></div>
                            <div id="faq3" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum
                                    integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt.
                                    Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq4" className="collapsed question">Ac odio tempor orci dapibus. Aliquam
                                eleifend mi in nulla? <i className="bi bi-chevron-down icon-show"></i><i
                                    className="bi bi-chevron-up icon-close"></i></div>
                            <div id="faq4" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id
                                    donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit
                                    ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq5" className="collapsed question">Tempus quam pellentesque nec nam
                                aliquam sem et tortor consequat? <i className="bi bi-chevron-down icon-show"></i><i
                                    className="bi bi-chevron-up icon-close"></i></div>
                            <div id="faq5" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc
                                    vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus
                                    gravida quis blandit turpis cursus in
                                </p>
                            </div>
                        </li>

                        <li>
                            <div data-bs-toggle="collapse" href="#faq6" className="collapsed question">Tortor vitae purus faucibus ornare.
                                Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bi bi-chevron-down icon-show"></i><i
                                    className="bi bi-chevron-up icon-close"></i></div>
                            <div id="faq6" className="collapse" data-bs-parent=".faq-list">
                                <p>
                                    Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada
                                    nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis
                                    tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas
                                    fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
                                </p>
                            </div>
                        </li> */}

                    </ul>

                </div>
            </section>
            {/* <!-- End F.A.Q Section --> */}
        </>
    )
}

export default Faq