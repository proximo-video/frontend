import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
// import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
// import Testimonial from '../components/sections/Testimonial';
import {useSelector} from 'react-redux';
import {AboutUsInner} from "./AboutUs";
import {browser} from "./Room/RoomFooter";
// import Button from "../components/elements/Button";
// import Modal from "../components/elements/Modal";


const Home = (props) => {
    const isLogged = useSelector(state => state.isLogged);
    if (isLogged)
        props.history.push('/user');
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
        </>
    );
}

export default Home;