import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

function Welcome() {
    const [success,setSuccess] = useState(false);
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
                setSuccess(true);
            }
        }
        fetchData();
    }, []);

    return (success?<Redirect to={{pathname:"/user"}}></Redirect>:<></>)

}

export default Welcome;