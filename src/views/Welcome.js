import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { login,setId,setName,setRooms } from '../redux/actions';
function Welcome(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const redirectURL = new URLSearchParams(state).get("path");
        console.log(redirectURL)
        const noRedirect = ['/','/privacy-policy','/about-us']        
        const scope = urlParams.get("scope")
        let service;
        scope === null ? service = "github" : service = "google";
        const fetchData = async () => {
            let response = await fetch('http://api.proximo.pw/auth', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ service: service, code: code })
            });
            if (response.ok) {
                let data = await response.json()
                dispatch(setId(data.id));
                dispatch(setName(data.name));
                if (data.rooms)
                    dispatch(setRooms(data.rooms));
                dispatch(login());
                if(noRedirect.indexOf(redirectURL)!==-1 || !redirectURL)
                    props.history.push('/user');
                else
                    props.history.push(redirectURL)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (<></>)

}

export default Welcome;