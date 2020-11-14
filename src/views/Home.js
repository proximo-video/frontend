import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
// import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
// import Testimonial from '../components/sections/Testimonial';
import { useSelector } from 'react-redux';
import { AboutUsInner } from "./AboutUs";
// import {browser} from "./Room/RoomFooter";
// import Button from "../components/elements/Button";
// import Modal from "../components/elements/Modal";

const oneTapLogin = () => {
    return (
        <div id="g_id_onload"
            data-client_id="150668394436-t4sh915ilqum6t7a8lf0i4p42ilkg0s3.apps.googleusercontent.com"
            data-callback="authenticationResponse"
            data-login_uri="https://proximo.pw/welcome">
        </div>
    )
}

const Home = (props) => {
    const isLogged = useSelector(state => state.isLogged);
    if (isLogged)
        props.history.push('/user');
    return (
        <>
            {oneTapLogin()}
            <Hero history={props.history} className="illustration-section-01" />
            {/*<FeaturesTiles />*/}
            <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
            {/*<Testimonial topDivider />*/}
            {/*<div className={"home-about-us"}>*/}
            {/*  <AboutUsInner/>*/}
            {/*</div>*/}
            <AboutUsInner className={"home-about-us"} heading={"Meet the creators"} headingType={2} />
        </>
    );
}

export default Home;
