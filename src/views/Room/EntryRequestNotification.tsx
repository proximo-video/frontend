import React, {useEffect} from "react";
import NotificationContainer from "./Notification/NotificationContainer";
import {RequestMessage} from "./Notification/NotificationManager";
import {EntryRequest} from "./genericTypes";
import {useSelector, RootStateOrAny} from 'react-redux';

export interface EntryRequestNotificationProps {

}

export default function EntryRequestNotification(props: EntryRequestNotificationProps) {
    let entryAudio: HTMLAudioElement;
    const entryRequestList = useSelector((state:RootStateOrAny)=>state.entryRequestList);
  
    useEffect(()=>{
        const length = entryRequestList.length
        if(length)
            createNotification(entryRequestList[length-1]);
        // eslint-disable-next-line
    },[entryRequestList]);
  
    const createNotification = (message:EntryRequest) => {
        if (entryAudio)
            entryAudio.play().then();
        RequestMessage("entry-notifications", message);
    };
  
    useEffect(() => {
        // eslint-disable-next-line
        entryAudio = new Audio('/Sounds/intuition.mp3');
    }, []);
  
    return (
        <div>
            <NotificationContainer id={"entry-notifications"} position={"bottom-right"}/>
        </div>
    );
}