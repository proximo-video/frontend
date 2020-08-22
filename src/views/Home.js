import React, {useEffect, useState} from 'react';
// import sections
import Hero from '../components/sections/Hero';
// import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
// import Testimonial from '../components/sections/Testimonial';
import {useSelector} from 'react-redux';
import {AboutUsInner} from "./AboutUs";
import {browser} from "./Room/RoomFooter";
import Button from "../components/elements/Button";
import Modal from "../components/elements/Modal";

export function isSafari() {
    return browser.name === 'safari';
}


const Home = (props) => {
    const isLogged = useSelector(state => state.isLogged);
    const [showModal, setShowModal] = useState(false);
    if (isLogged)
        props.history.push('/user');
    const closeDeleteModal = () => {
        setShowModal(false);
    }
    const ShowBrowserWarningModal = () => {
        return (
            <Modal show={showModal} handleClose={closeDeleteModal}>
                <div>
                    <h3>Warning</h3>
                    <h5>Hi! Pardon the interruption.</h5>
                    <h6>
                        We recommend you to use <b>Firefox</b> or <b>Chrome</b> for better user experience.
                        We cannot guarantee to delivery same experience in other browsers.
                    </h6>
                </div>
            </Modal>
        );
    }
    useEffect(() => {
        if (isSafari())
            setShowModal(true);
    }, []);
    return (
        <>
            <Hero history={props.history} className="illustration-section-01"/>
            {/*<FeaturesTiles />*/}
            <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02"/>
            {/*<Testimonial topDivider />*/}
            {/*<div className={"home-about-us"}>*/}
            {/*  <AboutUsInner/>*/}
            {/*</div>*/}
            <AboutUsInner className={"home-about-us"} heading={"Meet the creators"} headingType={2}/>
            {ShowBrowserWarningModal()}
        </>
    );
}

export default Home;