import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import { ApiService } from '../Services/apiservices';
import constant from '../Services/constant';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Homeslider = () => {
    const [sliderData, setsliderData] = useState([]);
    const [slider_image_path, setslider_image_path] = useState('');
    const [loading, setloading] = useState(false);

    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            setloading(false);
            ApiService.fetchData('slider-banner').then((res) => {
                if (res.status == "success") {
                    setsliderData(res?.sliderData);
                    setslider_image_path(res?.SLIDER_IMAGE_PATH);
                    setloading(true)
                }
            })
            
        }
        didMountRef.current = false;
    }, [])
    console.log('sliderData:', sliderData);
    console.log('slider_image_path:', slider_image_path);
    return (
        <>
            {/* <!-- ======= Hero Section ======= --> */}
            <section id="hero" className="d-flex align-items-center">
            <div className="container-fluid">

                {
                    loading == false ? <>
                        <Skeleton style={{ width: '100vw' }} height={500}></Skeleton>
                    </> :
                        (
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={1}
                                modules={[Autoplay, Pagination, Navigation]}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                              >
                                {
                                    sliderData.length > 0 ?
                                        sliderData.map((value, index) => (
                                            value.slider_position === 1 ?
                                                <>
                                                    <div className={loading ? 'd-none' : ''}>
                                                        <SwiperSlide>
                                                                <div className="row gy-4" key={index}>

                                                                    <div className="col-lg-12 order-1 order-lg-2 hero-img">
                                                                        <img src={value.slider_image != '' ? slider_image_path + value.slider_image : constant.DEFAULT_IMAGE} className="w-100 animated" alt="" />
                                                                    </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    </div>
                                                </> : ''
                                        ))
                                        : ''
                                }
                            </Swiper>
                        )
                }
</div>
            </section>
            {/* <!-- End Hero --> */}
        </>
    )
}

export default Homeslider