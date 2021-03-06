import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { login, setId, setName, setRooms, logout, error } from './redux/actions';
import './App.css';
import { Error, Success, Warning } from './views/Room/Notification/NotificationManager';
import {httpRequestError} from './ErrorsList';


import Preloader from './utils/Preloader';
import NotificationContainer from "./views/Room/Notification/NotificationContainer";
import { Route } from "react-router-dom";
import { ErrorNotFound } from "./views/ErrorNotFound";
import Modal from "./components/elements/Modal";
import { browser } from "./views/Room/RoomFooter";

// Layouts
import LayoutDefault from './layouts/LayoutDefault';
import WhiteLayout from './layouts/WhiteLayout';
import {Login} from "./utils/Login";
import {oneTapLogin} from "./utils/Constants/stringConst";
import {History} from "./utils/History";

// Views 

const Home = lazy(() => import('./views/Home'));
const Welcome = lazy(() => import('./views/Welcome'));
const User = lazy(() => import('./views/User'));
const Room = lazy(() => import('./views/Room'));
const PrivacyPolicy = lazy(() => import('./views/PrivacyPolicy'));
const SignIn = lazy(() => import('./views/SignIn'));
const AboutUs = lazy(() => import('./views/AboutUs'));
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

const OneTapLogin = (dispatch) => {
  window.google.accounts.id.initialize({
    client_id: '150668394436-t4sh915ilqum6t7a8lf0i4p42ilkg0s3.apps.googleusercontent.com',
    callback: (response) => {
      Login(oneTapLogin, History, dispatch, response);
    }
  });
  window.google.accounts.id.prompt();
}

const App = (props) => {
  const [ fetched, setFetched ] = useState(false);
  const errorDetails = useSelector(state => state.error);
  const successDetails = useSelector(state => state.success);
  const warningDetails = useSelector(state => state.warning);
  const isLoggedIn = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const [ showModal, setShowModal ] = useState(false);
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
  }, [ location ]);

  useEffect(() => {
    if (errorDetails) {
      Error("generic-error-notification", errorDetails, 'Error', 8000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ errorDetails ]);

  useEffect(() => {
    if (successDetails) {
      Success("generic-error-notification", successDetails, '', 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ successDetails ]);

  useEffect(() => {
    if (warningDetails) {
      Warning("generic-error-notification", warningDetails, 'Warning', 8000)
    }
    if (isSafari() || isIos())
      setShowModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ warningDetails ]);

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
      <Suspense fallback={<></>}>
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/welcome" component={Welcome} layout={WhiteLayout} />
          <AppRoute exact path="/user" component={User} layout={LayoutDefault} />
          <AppRoute exact path="/privacy-policy" component={PrivacyPolicy} layout={LayoutDefault} />
          <AppRoute exact path="/login" component={SignIn} layout={LayoutDefault} />
          <Route exact path="/error" render={() => <LayoutDefault><ErrorNotFound ErrorCode={404} ErrorMessage={"Room does Not Exists. Please make sure this room exists, if not then login and create one."} /></LayoutDefault>} />
          <Route exact path="/roomerror" render={() => <LayoutDefault><ErrorNotFound /></LayoutDefault>} />
          <AppRoute exact path="/about-us" component={AboutUs} layout={LayoutDefault} />
          <AppRoute path="/:roomId" component={Room} layout={WhiteLayout} />
        </Switch>
      </Suspense>
      {!isLoggedIn && OneTapLogin(dispatch)}
      {/*{}*/}
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
