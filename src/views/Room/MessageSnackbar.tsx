import React, {useEffect, useState} from "react";
import MessageComponent from "./MessageComponent";
import Styles from '../../assets/scss/custom/snackbar.module.scss';
import NotificationContainer from "./Notification/NotificationContainer";
import {info} from "./Notification/NotificationManager";
import '../../assets/scss/custom/Notification/notifications.scss';

export interface SnackbarProps {
    className?: string;
    position?: string;
    color?: string;
    children: any;
}

export function Snackbar({children, className, position, color}: SnackbarProps) {
    let left, right, top, bottom : string = '';
    let offset: string = '15px';
    switch (position) {
        case 'bottom-center':
            bottom = offset;
            left = '50%';
            break;
        case 'top-center':
            top = offset;
            left = '50%';
            break;
        case 'top-right':
            top = offset;
            right = offset;
            break;
        case 'bottom-right':
            bottom = offset;
            right = offset;
            break;
        case 'bottom-left':
            bottom = offset;
            left = offset;
            break;
        case 'top-left':
            top = offset;
            left = offset;
            break;
    }
    const snackbarStyles = {
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        color: (color ?? ''),
        position: 'absolute'
    } as React.CSSProperties;
    return (
        <div className={className + ' snackbar'} style={snackbarStyles}>
            {children}
        </div>
    );
}

Snackbar.defaultProps = {
    className: '',
    position: 'bottom-center',
    value: ''
}

export interface MessageSnackbarProps {

}

export default function MessageSnackbar(props: MessageSnackbarProps) {
    // let snackbarRef: Element;
    const [message, setMessage] = useState<string>('');
    // let message: string = '';
    // const [isActive, setIsActive] = useState<boolean>(false);
    // const [classname, setClassname] = useState<string>('');
    const createNotification = () => {
        info(message);
    };
    const openSnackBar = () => {
        const newMessage = Math.random().toString(36).slice(2);
        setMessage(newMessage);
        createNotification();
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setMessage('');
    //     }, 10000000);
    // }, [message]);

    return (
        <div>
            <button className={"temp-button"} onClick={openSnackBar} style={{position:"absolute", top: 0}}>Mess</button>
                {/*<Snackbar position={"bottom-left"} className = {"message-snackbar " + (message !== '' ? [Styles.snackbar, Styles.show].join(" ") : Styles.snackbar)}>*/}
                {/*    <MessageComponent userId={"342432412rtr"} message={"www.stackoverflow.com There are many variations " + message} displayName={"oh crap"} messageBodyClassName={"side-message-body"}/>*/}
                {/*</Snackbar>*/}
            <NotificationContainer enterTimeout={500} leaveTimeout={400}/>
        </div>
    );
}