import React, {useState} from "react";
import NotificationContainer from "./Notification/NotificationContainer";
import {Message} from "./Notification/NotificationManager";
import '../../assets/scss/custom/Notification/notifications.scss';
import MessageComponent from "./MessageComponent";

export interface MessageSnackbarProps {
}

export default function MessageNotification(props: MessageSnackbarProps) {
    const [message, setMessage] = useState<string>('');

    const createNotification = (message) => {
        const messageComponent = <MessageComponent userId={"3289832bkjdb"} message={"hello crap www.stackoverflow.com @SrBachchan " + message} displayName={"Oh crap"} messageBodyClassName={"side-message-body"}/>
        Message(messageComponent, '', 10000);
    };

    const openSnackBar = () => {
        const newMessage = Math.random().toString(36).slice(2);
        setMessage(newMessage);
        createNotification(newMessage);
    };

    return (
        <div>
            <button className={"temp-button"} onClick={openSnackBar} style={{position: "absolute", top: 0}}>Mess
            </button>
            <NotificationContainer/>
        </div>
    );
}