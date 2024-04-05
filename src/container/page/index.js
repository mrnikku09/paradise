import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { useParams } from 'react-router-dom';
import { ApiService } from '../../Components/Services/apiservices';
import Error from '../error';

const Page = () => {

    const [pageData, setPageData] = useState();
    const { slug } = useParams();
    const didMountRef = useRef(true);

    useEffect(() => {
        if (didMountRef.current) {
            const dataString = {
                page_url: slug
            }
            ApiService.postData('page', dataString).then((res) => {
                if (res.status == "success") {
                    console.log(res.pageData);
                    setPageData(res?.pageData);
                }
            })

        }
        didMountRef.current = false;
    }, [])


    return (
        <>
            <Header />
            {/* <!-- ======= Breadcrumbs Section ======= --> */}

            <main id="main">
                {pageData != null ? <>
                    <section class="breadcrumbs">
                        <div class="container">
                            <div class="d-flex justify-content-between align-items-center">
                                <h2>{pageData?.page_name}</h2>
                                <ol>
                                    <li><a href="index.html">Home</a></li>
                                    <li>{pageData?.page_name}</li>
                                </ol>
                            </div>

                        </div>
                    </section>
                    {/* <!-- End Breadcrumbs Section --> */}

                    <section class="inner-page">
                        <div class="container">
                            <div dangerouslySetInnerHTML={{ __html: pageData?.page_content }}></div>
                        </div>
                    </section>
                </> : 
                <>
                    <Error/>
                </>
                }

            </main>

            {/* </main><!-- End #main --> */}
            <Footer />
        </>
    )
}

export default Page