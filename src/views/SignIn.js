import React from 'react';
import ButtonGroup from '../components/elements/ButtonGroup';
import Button from '../components/elements/Button';
import GoogleLogo from '../assets/images/google.png';
import GithubLogo from '../assets/images/github.png';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const SignIn = (props) => {
    const isLogged = useSelector(state => state.isLogged);
    let path = '';
    if (props.location.state)
        path = props.location.state.prevPath
    const state = 'path=' + path;
    return (!isLogged ?
        <div className="login-container">
            <div className={"card login-container-inner"}>
                <div className={"card-content"}>
                    <h1 className={"login-h1"}>Login</h1>
                    <h6 className={"login-h6"}>To experience some awesomeness.</h6>
                    <p className={"login-medium"}>Create your own rooms with personalized URL</p>
                    <ButtonGroup>
                        <Button tag="a" color="dark" wideMobile href={"https://accounts.google.com/o/oauth2/v2/auth?client_id=150668394436-t4sh915ilqum6t7a8lf0i4p42ilkg0s3.apps.googleusercontent.com&redirect_uri=https://proximo.pw/welcome&response_type=code&scope=profile&state=" + state}>
                            Login with <img className="logo" src={GoogleLogo} alt="Google Login"></img>
                        </Button>
                        <Button tag="a" wideMobile href={"https://github.com/login/oauth/authorize?client_id=a3b7842c5f4c93cc4b7d&redirect_uri=https://proximo.pw/welcome&state=" + state}>
                            Login with <img className="logo" src={GithubLogo} alt="Github Login"></img>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div> : <Redirect to='/user' />
    )
}

export default SignIn;