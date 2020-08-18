import React from 'react';
import ButtonGroup from '../components/elements/ButtonGroup';
import Button from '../components/elements/Button';
import GoogleLogo from '../assets/images/google.png';
import GithubLogo from '../assets/images/github.png';

const SignIn = () => {
    return (
        <div className="container section">
            <ButtonGroup>
                <Button tag="a" color="dark" wideMobile href="https://accounts.google.com/o/oauth2/v2/auth?client_id=287838666978-fnnt6fujf4malkfn3ppoqrrdcfqk75h1.apps.googleusercontent.com&redirect_uri=http://localhost:8000/welcome.html&response_type=code&scope=profile">
                    Login with <img className="logo" src={GoogleLogo} alt="Google Login"></img>
                </Button>
                <Button tag="a" wideMobile href="https://github.com/login/oauth/authorize?client_id=a3b7842c5f4c93cc4b7d&redirect_uri=https://proximo.pw/welcome">
                    Login with <img className="logo" src={GithubLogo} alt="Github Login"></img>
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default SignIn;