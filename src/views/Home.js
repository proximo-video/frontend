import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
// import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import {useSelector} from 'react-redux';

const Home = (props) => {
  const isLogged = useSelector(state => state.isLogged);
  if(isLogged)
    props.history.push('/user');
  return  (
    <>
      <Hero history={props.history} className="illustration-section-01" />
      {/*<FeaturesTiles />*/}
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
    </>
  );
}

export default Home;