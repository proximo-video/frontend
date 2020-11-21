import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {oAuth2Login} from "../utils/Constants/stringConst";
import {Login} from "../utils/Login";
function Welcome(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        Login(oAuth2Login, props.history, dispatch);
        // eslint-disable-next-line
    }, []);

    return (<></>)

}

export default Welcome;