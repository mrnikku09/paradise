import React, { useEffect, useRef, useState } from 'react'
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';
// import  from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import {  } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import Skeleton from 'react-loading-skeleton';

const Team = () => {

    const [teamData, setteamData] = useState([]);
    const [teamImagePath, setteamImagePath] = useState('');
    const [loading, setloading] = useState('');

    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            setloading(false);
            ApiService.fetchData('featuredourteam').then((res) => {
                if (res.status == "success") {
                    setteamData(res?.teamData);
                    setteamImagePath(res?.OUR_TEAM_IMAGE);
                    setloading(true)
                }
            })

        }
        didMountRef.current = false;
    }, [])
    return (
        <>
            {/* <!-- ======= Team Section ======= --> */}
            <section id="team" className="team">
                <div className="container">

                    <div className="section-title" >
                        <h2>Team</h2>
                        <p>Our team is always here to help</p>
                    </div>

                    <div className="row">
                        {
                            loading == false ? <>
                                <Swiper
                                    spaceBetween={50}
                                    // slidesPerView={3}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                        }, 540: {
                                            slidesPerView: 2,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                        },
                                        1200: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {[...Array(5)].map((_, index) => (
                                        <>
                                            <SwiperSlide>
                                                {/* <div className="col-lg-4"> */}

                                                <Skeleton height={250}></Skeleton>
                                                {/* </div> */}
                                            </SwiperSlide>
                                        </>
                                    ))}
                                </Swiper>
                            </> :
                                <>
                                    {teamData.length > 0 ?
                                        <>
                                            <Swiper
                                                spaceBetween={30}
                                                // slidesPerView={3}
                                                modules={[Autoplay, Pagination, Navigation]}
                                                autoplay={{
                                                    delay: 2500,
                                                    disableOnInteraction: false,
                                                }}
                                                breakpoints={{
                                                    0: {
                                                        slidesPerView: 1,
                                                    }, 540: {
                                                        slidesPerView: 2,
                                                    },
                                                    768: {
                                                        slidesPerView: 2,
                                                    },
                                                    1024: {
                                                        slidesPerView: 3,
                                                    },
                                                    1200: {
                                                        slidesPerView: 4,
                                                    },
                                                }}
                                            >
                                                {teamData.map((value, index) => (
                                                    <>
                                                    <SwiperSlide>

                                                        <div className="">
                                                            <div className="member">
                                                                <img src={value?.team_image != '' ? teamImagePath + value?.team_image : constant.DEFAULT_IMAGE} className="img-fluid" alt="" />
                                                                <div className="member-info">
                                                                    <div className="member-info-content">
                                                                        <h4>{value.team_name}</h4>
                                                                        <span>{value.team_designation}</span>
                                                                    </div>
                                                                    <div className="social">
                                                                        <a href=""><i className="bi bi-twitter"></i></a>
                                                                        <a href=""><i className="bi bi-facebook"></i></a>
                                                                        <a href=""><i className="bi bi-instagram"></i></a>
                                                                        <a href=""><i className="bi bi-linkedin"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </SwiperSlide>

                                                    </>))}
                                            </Swiper>
                                        </> :
                                        ""
                                    }

                                </>
                        }

                        {/* <div className="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
                            <div className="member">
                                <img src="assets/img/team/team-2.jpg" className="img-fluid" alt="" />
                                <div className="member-info">
                                    <div className="member-info-content">
                                        <h4>Sarah Jhonson</h4>
                                        <span>Product Manager</span>
                                    </div>
                                    <div className="social">
                                        <a href=""><i className="bi bi-twitter"></i></a>
                                        <a href=""><i className="bi bi-facebook"></i></a>
                                        <a href=""><i className="bi bi-instagram"></i></a>
                                        <a href=""><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="300">
                            <div className="member">
                                <img src="assets/img/team/team-3.jpg" className="img-fluid" alt="" />
                                <div className="member-info">
                                    <div className="member-info-content">
                                        <h4>William Anderson</h4>
                                        <span>CTO</span>
                                    </div>
                                    <div className="social">
                                        <a href=""><i className="bi bi-twitter"></i></a>
                                        <a href=""><i className="bi bi-facebook"></i></a>
                                        <a href=""><i className="bi bi-instagram"></i></a>
                                        <a href=""><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="400">
                            <div className="member">
                                <img src="assets/img/team/team-4.jpg" className="img-fluid" alt="" />
                                <div className="member-info">
                                    <div className="member-info-content">
                                        <h4>Amanda Jepson</h4>
                                        <span>Accountant</span>
                                    </div>
                                    <div className="social">
                                        <a href=""><i className="bi bi-twitter"></i></a>
                                        <a href=""><i className="bi bi-facebook"></i></a>
                                        <a href=""><i className="bi bi-instagram"></i></a>
                                        <a href=""><i className="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>

                </div>
            </section>
            {/* <!-- End Team Section --> */}
        </>
    )
}

export default Team