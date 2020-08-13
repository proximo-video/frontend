import React, {useState} from "react";
import NotificationContainer from "./Notification/NotificationContainer";
import {Message} from "./Notification/NotificationManager";
import '../../assets/scss/custom/notifications.scss';
import MessageComponent from "./MessageComponent";

export interface MessageNotificationProps {
    handleMessageNotificationClick: () => void;
}

export default function MessageNotification(props: MessageNotificationProps) {
    // eslint-disable-next-line
    const [message, setMessage] = useState<string>('');

    const createNotification = (message) => {
        const messageComponent = <MessageComponent id={"3289832bkjdb"} message={"hello crap www.stackoverflow.com @SrBachchan " + message} displayName={"Oh crap"} messageBodyClassName={"side-message-body"} className={"side-message-component"}/>
        Message("messages", messageComponent, '', 5000, props.handleMessageNotificationClick);
    };

    const openSnackBar = () => {
        const newMessage = Math.random().toString(36).slice(2);
        setMessage(newMessage);
        createNotification(newMessage);
    };

    return (
        <div>
            <button className={"temp-button"} onClick={openSnackBar} style={{position: "absolute", top: 0, left: 0}}>Mess
            </button>
            <NotificationContainer id={"messages"} position={'bottom-left'}/>
            {/*<NotificationContainer position={'bottom-right'}/>*/}
        </div>
    );
}