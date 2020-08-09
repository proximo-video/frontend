import React, {useEffect} from 'react';
import classnames from 'classnames';

export interface NotificationProps {
    type: "info" | "success" | "warning" | "error",
    title: any,
    message: any,
    timeOut: number,
    onClick: () => void,
    onRequestHide: () => void,
}

// {type, title, message, timeOut, onClick, onRequestHide}

export default function Notification(props: NotificationProps) {
    let timer: NodeJS.Timeout;
    useEffect(() => {
        const {timeOut} = props;
        if (timeOut !== 0) {
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

    const requestHide = () => {
        const { onRequestHide } = props;
        if (onRequestHide) {
            onRequestHide();
        }
    };

    const {type, message} = props;
    let {title} = props;
    const className = classnames(['notification', `notification-${type}`]);
    title = title ? (<h4 className="title">{title}</h4>) : null;
    return (
        <div className={className} onClick={handleClick}>
            <div className="notification-message" role="alert">
                {title}
                <div className="message">{message}</div>
            </div>
        </div>
    );
}

Notification.defaultProps = {
    type: 'info',
    title: null,
    message: null,
    timeOut: 5000,
    onRequestHide: () => {
    },
    onClick: () => {
    },
}