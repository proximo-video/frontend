import React from "react";
import NotificationContainer from "./Notification/NotificationContainer";
import {RequestMessage} from "./Notification/NotificationManager";
import {EntryRequest} from "./genericTypes";

export interface EntryRequestNotificationProps {

}

export default function EntryRequestNotification(props: EntryRequestNotificationProps) {
    const createNotification = (message) => {
        const requestMessage: EntryRequest = {
            id: message,
            displayName: "Aniket",
        }
        RequestMessage("entry-notifications", requestMessage);
    };

    const openRequestNotification = () => {
        const newMessage = Math.random().toString(36).slice(2);
        createNotification(newMessage);
    };
    return (
        <div>
            <button className={"temp-button"} onClick={openRequestNotification} style={{position: "absolute", top: 0, left: 0}}>Mess
            </button>
            <NotificationContainer id={"entry-notifications"} position={"bottom-right"}/>
        </div>
    );
}