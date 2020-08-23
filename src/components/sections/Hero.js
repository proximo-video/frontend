import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import GoogleLogo from '../../assets/images/google.png';
import GithubLogo from '../../assets/images/github.png';
// import {Error} from "../../views/Room/Notification/NotificationManager";
// import { UseHistory } from "react-router-dom";

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
  const [roomIdInput, setRoomIdInput] = useState("");
  const [showRoomNameWarning, setShowRoomNameWarning] = useState(false);
  const [showJoinInputArea, setShowJoinInputArea] = useState(false);

  const handleJoinButtonClick = () => {
    setShowJoinInputArea(true);
  }

  const roomInputHandle = (event) => {
    const roomId = event.target.value.trim();
    setRoomIdInput(event.target.value);

    if (roomId !== '' && roomId.match(/^[0-9a-zA-Z]+$/)) {
      event.target.style.border = '3px solid green';
      setShowRoomNameWarning(false);
    }
    else if (roomId !== '')
      setShowRoomNameWarning(true);
    else if (roomId === '') {
      event.target.style.border = 'none';
      setShowRoomNameWarning(false);
    }
  }

  const goToRoom = (e) => {
    e.preventDefault();
    const roomName = roomIdInput.trim();
    if (roomName !== '' && roomName.match(/^[0-9a-zA-Z]+$/)) {
      props.history.push('/' + roomName);
    } else {
      setShowRoomNameWarning(true);
    }
  }
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom heading" data-reveal-delay="200">
              Bring people together with <span className="text-color-primary">Proximo</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom para-description" data-reveal-delay="400">
                Host or join high-performing video meetings, go live, collaborate with your friends, and share anywhere.
                </p>
              <div className="reveal-from-bottom login-buttons" data-reveal-delay="600">
                <p style={{textAlign: 'center'}}>Login to create your own meeting room.</p>
                <ButtonGroup>
                  <Button tag="a" color="dark" wideMobile href="https://accounts.google.com/o/oauth2/v2/auth?client_id=150668394436-t4sh915ilqum6t7a8lf0i4p42ilkg0s3.apps.googleusercontent.com&redirect_uri=https://proximo.pw/welcome&response_type=code&scope=profile">
                    Login with <img className="logo" src={GoogleLogo} alt="Google Login"></img>
                  </Button>
                  <Button tag="a" wideMobile href="https://github.com/login/oauth/authorize?client_id=a3b7842c5f4c93cc4b7d&redirect_uri=https://proximo.pw/welcome">
                    Login with <img className="logo" src={GithubLogo} alt="Github Login"></img>
                  </Button>
                </ButtonGroup>
              </div>
              <div className={"join-area"}>
                <p>Or join a an <b>EXISTING MEETING ROOM</b> without logging in</p>
                {/*<Button>Join</Button>*/}
                <Button onClick={handleJoinButtonClick} tag="a" color="dark" wideMobile className={"join-area-button" + (showJoinInputArea ? ' hide' : '')}>
                  Join
                </Button>
                <div className={"input-area" + (showJoinInputArea ? ' show' : '')}>
                  <label className={"input-label"} style={showRoomNameWarning ? { display: 'block' } : {}}>
                    Room name can only be alphanumeric:
                  </label>
                  <form onSubmit={goToRoom} className={"home-page-join-form"}>
                    <input
                      id={"room-name-input"}
                      className={"form-input"}
                      value={roomIdInput}
                      onChange={roomInputHandle}
                      placeholder={"Room Name"}
                      style={showRoomNameWarning ? { border: '3px solid #f26b4c' } : {}}
                    />
                    <Button color="primary add-room-button" onClick={goToRoom}>Go to room</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <img alt="roomview" src="/images/roomview.jpg"/>
          </div>
        </div>
      </div >
    </section >
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;