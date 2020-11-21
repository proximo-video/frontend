import {error, login, setId, setName, setRooms} from "../redux/actions";
import {authError, httpRequestError} from "../ErrorsList";
// @ts-ignore
import {authURLs, noRedirect} from "./Constants/URLs";
import {oneTapLogin} from "./Constants/stringConst";

export const Login = (authType, history, dispatch, googleResponse = '') => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const redirectURL = new URLSearchParams(state).get("path");
    const fetchUrl = authType === oneTapLogin?authURLs.oneTapLogin:authURLs.oAuth2Login;
    const scope = urlParams.get("scope");
    let service;
    scope === null ? service = "github" : service = "google";
    const body = authType === oneTapLogin?googleResponse:{ service:service, code:code};
    const fetchData = async () => {
        try {
            let response = await fetch(fetchUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                let data = await response.json()
                dispatch(setId(data.id));
                dispatch(setName(data.name));
                if (data.rooms)
                    dispatch(setRooms(data.rooms));
                dispatch(login());
                if (noRedirect.indexOf(redirectURL) !== -1 || !redirectURL)
                    history.push('/user');
                else
                    history.push(redirectURL)
            }
            else {
                dispatch(error(authError));
                history.push('/login');
            }
        } catch (e) {
            dispatch(error(httpRequestError))
        }
    }
    fetchData();
}