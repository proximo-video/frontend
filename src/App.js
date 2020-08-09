import React, { useRef, useEffect, useState } from 'react';
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
import RoomView from './views/Room/RoomView';

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
      let response = await fetch('https://proximo-video.herokuapp.com/getUser', { credentials: 'include' });
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
      <AppRoute exact path="/welcome" component={Welcome} layout={LayoutDefault} />
      <AppRoute exact path="/user" component={User} layout={LayoutDefault} />
      <AppRoute exact path="/room" component={RoomView} layout={WhiteLayout} />
      <AppRoute path="/:roomId" component={Room} layout={WhiteLayout} />
    </Switch>
    : <></>
  );
}

export default App;