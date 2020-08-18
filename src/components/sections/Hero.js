import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import GoogleLogo from '../../assets/images/google.png';
import GithubLogo from '../../assets/images/github.png';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Landing template for <span className="text-color-primary">startups</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="dark" wideMobile href="https://accounts.google.com/o/oauth2/v2/auth?client_id=287838666978-fnnt6fujf4malkfn3ppoqrrdcfqk75h1.apps.googleusercontent.com&redirect_uri=http://localhost:8000/welcome.html&response_type=code&scope=profile">
                    Login with <img className="logo" src={GoogleLogo} alt="Google Login"></img>
                    </Button>
                  <Button tag="a" wideMobile href="https://github.com/login/oauth/authorize?client_id=a3b7842c5f4c93cc4b7d&redirect_uri=https://proximo.pw/welcome">
                  Login with <img className="logo" src={GithubLogo} alt="Github Login"></img>
                    </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/video-placeholder.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;