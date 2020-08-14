import React from "react";
import NotificationContainer from "./Notification/NotificationContainer";
import MessageComponent from "./MessageComponent";
import {Message, RequestMessage} from "./Notification/NotificationManager";
import {EntryRequest} from "./genericTypes";

export interface EntryRequestNotificationProps {

}

export default function EntryRequestNotification(props: EntryRequestNotificationProps) {
    const createNotification = (message) => {
        // const messageComponent = <MessageComponent id={"3289832bkjdb"} message={"hello crap www.stackoverflow.com @SrBachchan " + message} displayName={"Oh crap"} messageBodyClassName={"side-message-body"}/>
        // Message("entry-notifications", messageComponent, '', 0);
        const requestMessage: EntryRequest = {
            id: message,
            displayName: "Aniket",
        }
        RequestMessage("entry-notifications", requestMessage);
    };

    const openSnackBar = () => {
        const newMessage = Math.random().toString(36).slice(2);
        // setMessage(newMessage);
        createNotification(newMessage);
    };
    return (
        <div>
            <button className={"temp-button"} onClick={openSnackBar} style={{position: "absolute", top: 0, left: 0}}>Mess
            </button>
            <NotificationContainer id={"entry-notifications"} position={"bottom-right"}/>
        </div>
    );
}