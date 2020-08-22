import React, { useEffect, useState } from "react";
import Button from "../components/elements/Button";
import { useSelector, RootStateOrAny } from "react-redux";

export interface ErrorNotFoundProps {
    ErrorCode: number;
    ErrorMessage: string;
    history: any;
}

export function ErrorNotFound(props: ErrorNotFoundProps) {
    const errorDetails = useSelector((state: RootStateOrAny) => state.error);
    const [errorMessage, setErrorMessage] = useState<string>("");
    useEffect(() => {
        if (props) {
            if (props.ErrorCode === 404 || props.ErrorCode === 601)
                setErrorMessage("Hmm... Looks like that " + props.ErrorMessage);
            else if (props.ErrorCode >= 500)
                setErrorMessage("Sorry..! Internal server error!");
        } else {
            if (!errorMessage)
                props.history.push('/error');
            setErrorMessage(errorDetails);
            console.log(errorDetails)
        }
        // eslint-disable-next-line
    }, []);
    // console.log(errorMessage);
    return (
        <div className={"generic-error-page"}>
            {props && (
                <>
                    <h1>{props.ErrorCode ? props.ErrorCode : "Something Went Wrong"}</h1>
                    {(props.ErrorCode === 404 || props.ErrorCode === 601) && <h5>Opps..! LOST in space?</h5>}
                    <h6>{errorMessage}</h6></>)}
            {/*@ts-ignore*/}
            <Button tag="a" color="dark" wideMobile href="https://www.proximo.pw">
                Go to home.
            </Button>
            {/*<img src={"/images/Space.png"} alt={"not-found"}/>*/}
        </div>
    );
}

ErrorNotFound.defaultProps = {
    ErrorMessage: "",
}