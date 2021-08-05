import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "../public/css/styles.css";
import TopNavigation from "../components/TopNavigation"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({ Component, pageProps }) {
    return (
        <>
            <ToastContainer position="top-center"/>
            <TopNavigation />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;