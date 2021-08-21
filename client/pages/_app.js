import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import "../public/css/styles.css";
import TopNavigation from "../components/TopNavigation"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, Context } from '../context';

function MyApp({ Component, pageProps }) {
    console.log("_app is rendering now")
    return (
        <Provider>
            <ToastContainer position="top-center" />
            <TopNavigation />
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp;