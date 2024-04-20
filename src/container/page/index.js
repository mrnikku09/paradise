import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { useParams } from 'react-router-dom';
import { ApiService } from '../../Components/Services/apiservices';
import Error from '../error';
import { Helmet } from 'react-helmet';
import constant from '../../Components/Services/constant';

const Page = () => {

    const [pageData, setPageData] = useState({});
    const [pageImageUrl, setPageImageUrl] = useState({});

    const { slug } = useParams();
    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            const dataString = {
                page_url: slug
            }
            ApiService.postData('page', dataString).then((res) => {
                if (res.status == "success") {
                    // console.log(res.pageData);
                    setPageImageUrl(res?.PAGE_IMAGE_URL);
                    setPageData(res?.pageData);
                }
            })

        }
        didMountRef.current = false;
    }, [])


    return (
        <>
            

            <Helmet>
                <title>{pageData?.page_meta_title}</title>
                <meta name="description" itemprop="description" content={pageData?.page_meta_desc != null ? pageData?.page_meta_desc : "Paradise"} />
                {pageData?.page_meta_keyword != null ? <meta name="keywords" content={pageData?.page_meta_keyword} /> : ""}
                <link rel="canonical" href={window?.location.href} />
                <meta property="og:title" content={pageData?.page_meta_title} />
                <meta name="twitter:url" content={window?.location.href} />
                <meta property="og:image" content={constant?.FRONT_URL + 'img/logo.png'} />
                <meta property="og:url" content={window?.location.href} />
                <meta property="og:description" content={pageData?.page_meta_desc != null ? pageData?.page_meta_desc : "Paradise"} />
                <meta name="twitter:title" content={pageData?.page_meta_title} />
                <meta name="twitter:description" content={pageData?.page_meta_desc != null ? pageData?.page_meta_desc : "Paradise"} />
                <meta property="twitter:image" content={constant.FRONT_URL + 'img/logo.png'} />
            </Helmet>

                <Header />
            <main id="main">
                {pageData != null ? <>
                <div className="subheader" style={{ background: `url(${pageData?.page_header_image != null ? pageImageUrl + pageData?.page_header_image : ''})` }}>
                    <div className="subheader-overlay"></div>
                    <div className="subheader-content">
                        <h1>{pageData?.page_name}</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item" aria-current="page">{pageData?.page_name}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                </> : 
                <>
                    <Error/>
                </>
                }
                </main>
                <Footer />
        </>
    )
}

export default Page