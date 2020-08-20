import React, {useEffect, useState} from "react";
import Button from "../components/elements/Button";

export interface ErrorNotFoundProps {
    ErrorCode: number;
    ErrorMessage: string;
}

export function ErrorNotFound(props: ErrorNotFoundProps) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    useEffect(() => {
        if (props.ErrorCode === 404 || props.ErrorCode === 601)
            setErrorMessage("Hmm... Looks like that " + props.ErrorMessage);
        else if (props.ErrorCode >= 500)
            setErrorMessage("Sorry..! Internal server error!");
        // eslint-disable-next-line
    },  []);
    // console.log(errorMessage);
    return (
        <div className={"generic-error-page"}>
            <h1>{props.ErrorCode}</h1>
            {(props.ErrorCode === 404 || props.ErrorCode === 601) && <h5>Opps..! LOST in space?</h5>}
            <h6>{errorMessage}</h6>
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