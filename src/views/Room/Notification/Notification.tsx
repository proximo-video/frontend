import React, {useEffect} from 'react';
import classnames from 'classnames';
import {EntryRequest} from "../genericTypes";
import {Constants} from "./NotificationManager";

export interface NotificationProps {
    type: "message" | "success" | "warning" | "error" | "request";
    title: any;
    message: any;
    timeOut: number;
    onClick: () => void;
    onRequestHide: () => void;
    position: 'bottom-left' | 'bottom-right' | 'top-right' | 'top-left';
    requestMessage?: EntryRequest;
}

// {type, title, message, timeOut, onClick, onRequestHide}

export default function Notification(props: NotificationProps) {
    let timer: NodeJS.Timeout;
    const {type, message, requestMessage} = props;
    useEffect(() => {
        const {timeOut} = props;
        if (timeOut !== 0) {
            // eslint-disable-next-line
            timer = setTimeout(requestHide, timeOut);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, []);

    const handleClick = () => {
        const { onClick } = props;
        if (onClick) {
            onClick();
        }
        requestHide();
    };

    const handleDenyClick = () => {
        console.log("User entry denied:", requestMessage.displayName, requestMessage.id);
        requestHide();
    }

    const handleAcceptClick = () => {
        console.log("User entry accepted:", requestMessage.displayName, requestMessage.id);
        requestHide();
    }

    const requestHide = () => {
        const { onRequestHide } = props;
        if (onRequestHide) {
            onRequestHide();
        }
    };

    let {title} = props;
    const className = classnames(['notification', `notification-${type}`, props.position]);
    if (type === Constants.REQUEST)
        title = <h4 className="title">{requestMessage.displayName}</h4>;
    else
        title = title ? (<h4 className="title">{title}</h4>) : null;
    return (
        <div className={className} onClick={type !== Constants.REQUEST ? handleClick : () => {}}>
            <div className={"notification-message-container " + type} role="alert">
                {title}
                <div className="message">
                    {
                        type === Constants.REQUEST ?
                            <div className={"entry-request-notification"}>
                                <p className={"entry-request-message"}>Wants to join meeting.</p>
                                <button onClick={handleDenyClick} className={"entry-request-deny"}>Deny</button>
                                <button onClick={handleAcceptClick} className={"entry-request-accept"}>Accept</button>
                            </div>
                        : message
                    }
                </div>
            </div>
        </div>
    );
}

Notification.defaultProps = {
    type: 'message',
    title: null,
    message: null,
    timeOut: 5000,
    onRequestHide: () => {
    },
    onClick: () => {
    },
    position: 'bottom-left'
}