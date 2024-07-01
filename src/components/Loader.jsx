import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the NProgress CSS
import '../CSS/Loader.css'

function Loader() {
    useEffect(() => {
        // Start the progress bar
        // Simulate a loading process
        NProgress.configure({ showSpinner: false });
        setTimeout(() => {
            NProgress.start();
            NProgress.set(0.1); // 10% progress
        }, 50);
        setTimeout(() => {
            NProgress.set(0.3); // 30% progress
        }, 500);
        setTimeout(() => {
            NProgress.set(1); // 100% progress
        }, 1000);
        // Cleanup function to ensure progress bar stops if component unmounts
        return () => {
            NProgress.done();
        };
    }, []);
    return (
        <>
        </>
    );
}

export default Loader;
