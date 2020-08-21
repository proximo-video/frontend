import React, { useEffect, useState } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { login, setId, setName, setRooms, logout, error } from './redux/actions';
import './App.css';
import { Error } from './views/Room/Notification/NotificationManager';
import {httpRequestError} from './ErrorsList';


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

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = (props) => {
  const [fetched, setFetched] = useState(false);
  const errorDetails = useSelector(state => state.error);
  const dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('https://api.proximo.pw/getUser', { credentials: 'include' });
      if (response.ok) {
        let data = await response.json()
        console.log(data);
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
    }
    try {
      fetchData();
    } catch (e) {
      dispatch(error(httpRequestError))
    }
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
    if (Object.keys(errorDetails).length !== 0) {
      console.log(errorDetails)
      Error("generic-error-notification", errorDetails, 'Error', 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorDetails]);
  return (fetched ?
    <>
      <Switch>
        <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
        <AppRoute exact path="/welcome" component={Welcome} layout={WhiteLayout} />
        <AppRoute exact path="/user" component={User} layout={LayoutDefault} />
        <AppRoute exact path="/privacy-policy" component={PrivacyPolicy} layout={LayoutDefault} />
        <AppRoute exact path="/login" component={SignIn} layout={LayoutDefault} />
        <Route exact path="/error" render={() => <LayoutDefault><ErrorNotFound ErrorCode={404} ErrorMessage={"page not found"} /></LayoutDefault>} />
        <AppRoute path="/:roomId" component={Room} layout={WhiteLayout} />
      </Switch>
      <NotificationContainer id={"generic-error-notification"} containerClassName={"generic-error-notification"} />
    </>
    : <>
      <Preloader />
      <NotificationContainer id={"generic-error-notification"} containerClassName={"generic-error-notification"} />
    </>
  );
}

export default App;