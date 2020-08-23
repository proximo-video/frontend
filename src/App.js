import React, { useEffect, useState } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { login, setId, setName, setRooms, logout, error } from './redux/actions';
import './App.css';
import { Error, Success, Warning } from './views/Room/Notification/NotificationManager';
import { httpRequestError } from './ErrorsList';


// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import WhiteLayout from './layouts/WhiteLayout';

// Views 
import Home from './views/Home';
import Welcome from './views/Welcome';
import User from './views/User';
import Room from './views/Room';
import Preloader from './utils/Preloader';
import PrivacyPolicy from './views/PrivacyPolicy';
import SignIn from './views/SignIn';
import NotificationContainer from "./views/Room/Notification/NotificationContainer";
import { Route } from "react-router-dom";
import { ErrorNotFound } from "./views/ErrorNotFound";
import AboutUs from "./views/AboutUs";
import Modal from "./components/elements/Modal";
import {browser} from "./views/Room/RoomFooter";
// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

export function isSafari() {
  return browser.name === 'safari';
}

export function isIos() {
  return browser.os === 'iOS';
}

const App = (props) => {
  const [fetched, setFetched] = useState(false);
  const errorDetails = useSelector(state => state.error);
  const successDetails = useSelector(state => state.success);
  const warningDetails = useSelector(state => state.warning);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  let location = useLocation();
  const closeDeleteModal = () => {
    setShowModal(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('https://api.proximo.pw/getUser', { credentials: 'include' });
        if (response.ok) {
          let data = await response.json()
          // console.log(data);
          dispatch(login())
          dispatch(setId(data.id));
          dispatch(setName(data.name));
          if (data.rooms)
            dispatch(setRooms(data.rooms));
        }
        else {
          dispatch(logout())
        }
        setFetched(true);
      } catch (e) {
        dispatch(error(httpRequestError))
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (fetched) {
      const page = location.pathname;
      trackPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (errorDetails) {
      Error("generic-error-notification", errorDetails, 'Error', 8000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorDetails]);

  useEffect(() => {
    if (successDetails) {
      Success("generic-error-notification", successDetails, '', 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successDetails]);

  useEffect(() => {
    if (warningDetails) {
      Warning("generic-error-notification", warningDetails, 'Warning', 8000)
    }
    if (isSafari() || isIos())
      setShowModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warningDetails]);

  const ShowBrowserWarningModal = () => {
    let warning;
    if (isIos()) {
      warning = "We are currently in Beta, as of now our support on mobile devices is currently limited to Android. We cannot guarantee to deliver the same experience in iOS. " +
          "We recommend you to try accessing this website on Android, or on your PC.";
    }
    else {
      warning = "We recommend you to use Firefox or Chrome for better user experience. We cannot guarantee to deliver the same experience in other browsers."
    }
    return (
        <Modal show={showModal} handleClose={closeDeleteModal}>
          <div>
            <h3>Warning</h3>
            <h5>Hi! Pardon the interruption.</h5>
            <h6>
              {warning}
              {/*We recommend you to use <b>Firefox</b> or <b>Chrome</b> for better user experience.*/}
              {/*We cannot guarantee to delivery same experience in other browsers.*/}
            </h6>
          </div>
        </Modal>
    );
  }

  return (fetched ?
    <>
      <Switch>
        <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
        <AppRoute exact path="/welcome" component={Welcome} layout={WhiteLayout} />
        <AppRoute exact path="/user" component={User} layout={LayoutDefault} />
        <AppRoute exact path="/privacy-policy" component={PrivacyPolicy} layout={LayoutDefault} />
        <AppRoute exact path="/login" component={SignIn} layout={LayoutDefault} />
        <Route exact path="/error" render={() => <LayoutDefault><ErrorNotFound ErrorCode={404} ErrorMessage={"Room Not Found. If you are trying to join a room then please login and create one then join."} /></LayoutDefault>} />
        <Route exact path="/roomerror" render={() => <LayoutDefault><ErrorNotFound /></LayoutDefault>} />
        <AppRoute exact path="/about-us" component={AboutUs} layout={LayoutDefault} />
        <AppRoute path="/:roomId" component={Room} layout={WhiteLayout} />
      </Switch>
      {ShowBrowserWarningModal()}
      <NotificationContainer id={"generic-error-notification"} containerClassName={"generic-error-notification"} />
    </>
    : <>
      <Preloader />
      <NotificationContainer id={"generic-error-notification"} containerClassName={"generic-error-notification"} />
    </>
  );
}

export default App;