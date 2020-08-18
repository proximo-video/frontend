import React, { useEffect } from 'react';
import ButtonGroup from '../components/elements/ButtonGroup';
import Button from '../components/elements/Button';
import GoogleLogo from '../assets/images/google.png';
import GithubLogo from '../assets/images/github.png';
import {useSelector} from 'react-redux';

const SignIn = (props) => {
    const noRedirect = ['/', '/privacy-policy', 'about-us'];
    const sessionToken = useSelector((state)=>state.sessionToken);
    let redirect = '';
    let state;
    useEffect(() => {
        if (noRedirect.indexOf(props.location.state.prevPath) === -1)
            //eslint-disable-next-line
            redirect = props.location.state.prevPath;
            //eslint-disable-next-line
            state='security_token='+sessionToken+'&path='+redirect;
            console.log(state);
    }, [])
    console.log(props.location.state.prevPath)
    return (
        <div className="container section">
            <ButtonGroup>
                <Button tag="a" color="dark" wideMobile href={"https://accounts.google.com/o/oauth2/v2/auth?client_id=287838666978-fnnt6fujf4malkfn3ppoqrrdcfqk75h1.apps.googleusercontent.com&redirect_uri=http://localhost:8000/welcome.html&response_type=code&scope=profile&state="+state}>
                    Login with <img className="logo" src={GoogleLogo} alt="Google Login"></img>
                </Button>
                <Button tag="a" wideMobile href={"https://github.com/login/oauth/authorize?client_id=a3b7842c5f4c93cc4b7d&redirect_uri=https://proximo.pw/welcome&state="+state}>
                    Login with <img className="logo" src={GithubLogo} alt="Github Login"></img>
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default SignIn;