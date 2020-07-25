import React, { useState, useEffect } from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      try{let response = await fetch('https://proximo-video.herokuapp.com/getSession', { credentials: 'include' });
      if (response.ok) {
        props.history.push("/user")
      }
    }
    catch(e){
      console.log(e);
    }
    }
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return  (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
      <Cta split />
    </>
  );
}

export default Home;