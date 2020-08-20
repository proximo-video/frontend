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
                    <p className={"login-medium"}>We are committed to deliver quality experience.</p>
                    <ButtonGroup>
                        <Button tag="a" color="dark" wideMobile href={"https://accounts.google.com/o/oauth2/v2/auth?client_id=287838666978-fnnt6fujf4malkfn3ppoqrrdcfqk75h1.apps.googleusercontent.com&redirect_uri=http://localhost:8000/welcome.html&response_type=code&scope=profile&state=" + state}>
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