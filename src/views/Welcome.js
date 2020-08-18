import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login,setId,setName,setRooms } from '../redux/actions';
function Welcome() {
    console.log(window.location.href);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get("code");
        const scope = urlParams.get("scope")
        let service;
        scope === null ? service = "github" : service = "google";
        const fetchData = async () => {
            let response = await fetch('https://proximo-video.herokuapp.com/auth', {
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
                setSuccess(true);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (success ? <Redirect to={{ pathname: "/user" }}></Redirect> : <></>)

}

export default Welcome;