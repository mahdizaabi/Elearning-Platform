import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "../public/css/styles.css";
import TopNavigation from "../components/TopNavigation"
import React from 'react'

function MyApp({Component, pageProps}) {
    return (
        <>
            <TopNavigation/>
            <Component {...pageProps}/ >
            </>
                )
            }

            export default MyApp;