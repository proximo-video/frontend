import React, { useEffect, useState } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';
import { login,setId,setName,setRooms,logout} from './redux/actions';
import './App.css';


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
import {ErrorNotFound} from "./views/ErrorNotFound";
import AboutUs from "./views/AboutUs";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = (props) => {
  const [fetched, setFetched] = useState(false);
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

  return (fetched ?
    <Switch>
      <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
      <AppRoute exact path="/welcome" component={Welcome} layout={WhiteLayout} />
      <AppRoute exact path="/user" component={User} layout={LayoutDefault} />
      <AppRoute exact path="/privacy-policy" component={PrivacyPolicy} layout={LayoutDefault}/>
      <AppRoute exact path="/login" component={SignIn} layout={LayoutDefault}/>
      <Route exact path="/error" render={() => <LayoutDefault><ErrorNotFound ErrorCode={404} ErrorMessage={"page not found"}/></LayoutDefault>}/>
      <AppRoute exact path="/about-us" component={AboutUs} layout={LayoutDefault}/>
      <AppRoute path="/:roomId" component={Room} layout={WhiteLayout} />
      <NotificationContainer id={"generic-error-notification"} containerClassName={"generic-error-notification"}/>
    </Switch>
    : <Preloader/>
  );
}

export default App;