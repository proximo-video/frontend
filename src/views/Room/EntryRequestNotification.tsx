import React, {useEffect, useRef} from "react";
import NotificationContainer from "./Notification/NotificationContainer";
import {RequestMessage} from "./Notification/NotificationManager";
import {EntryRequest} from "./genericTypes";
import {useSelector, RootStateOrAny} from 'react-redux';

export interface EntryRequestNotificationProps {

}

export default function EntryRequestNotification(props: EntryRequestNotificationProps) {
    const entryRequestList = useSelector((state:RootStateOrAny)=>state.entryRequestList);
    const notifyAudio = useRef(null);
    useEffect(()=>{
        const length = entryRequestList.length
        if(length)
            createNotification(entryRequestList[length-1]);
        // eslint-disable-next-line
    },[entryRequestList]);
  
    const createNotification = (message:EntryRequest) => {
        if (notifyAudio)
            notifyAudio.current.play();
        RequestMessage("entry-notifications", message);
    };
  
    return (
        <div>
            <audio ref={notifyAudio} src='/sounds/intuition.mp3'/>
            <NotificationContainer id={"entry-notifications"} position={"bottom-right"}/>
        </div>
    );
}