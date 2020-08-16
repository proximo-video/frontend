import React, {useEffect} from "react";
import NotificationContainer from "./Notification/NotificationContainer";
import {RequestMessage} from "./Notification/NotificationManager";
import {EntryRequest} from "./genericTypes";

export interface EntryRequestNotificationProps {

}

export default function EntryRequestNotification(props: EntryRequestNotificationProps) {
    let entryAudio: HTMLAudioElement;
    const createNotification = (message) => {
        const requestMessage: EntryRequest = {
            id: message,
            displayName: "Aniket",
        }
        if (entryAudio)
            entryAudio.play().then();
        RequestMessage("entry-notifications", requestMessage);
    };

    useEffect(() => {
        entryAudio = new Audio('/Sounds/intuition.mp3');
    }, []);

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