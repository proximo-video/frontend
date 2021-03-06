import React, {useEffect, useRef} from "react";
import {Message} from "./Notification/NotificationManager";
import MessageComponent from "./MessageComponent";
import {RootStateOrAny, useSelector} from "react-redux";
import {MessageType} from "./genericTypes";


export interface MessageNotificationProps {
    handleMessageNotificationClick: () => void;
}

export default function MessageNotification(props: MessageNotificationProps) {
    const users = useSelector((state: RootStateOrAny) => state.remoteUsers);
    const id = useSelector((state: RootStateOrAny) => state.id);
    const messages = useSelector((state: RootStateOrAny) => state.messages);
    const notifyAudio = useRef(null);
    useEffect(() => {
        if (messages.length >= 1) {
            let lastMessage : MessageType = messages[messages.length-1];
            if (lastMessage.id !== id && lastMessage.message !== '') {
                const displayName = users.hasOwnProperty(lastMessage.id)?users[lastMessage.id].displayName:'User Left';
                const messageComponent = <MessageComponent id={lastMessage.id} message={lastMessage.message} displayName={displayName} messageBodyClassName={"side-message-body"} className={"side-message-component"}/>;
                if (notifyAudio)
                    notifyAudio.current.play();
                Message("generic-error-notification", messageComponent, '', 5000, props.handleMessageNotificationClick);
            }
        }
        // eslint-disable-next-line
    }, [messages]);

    // return <NotificationContainer id={"messages"} position={'bottom-left'}/>;
    return <audio ref={notifyAudio} src='/sounds/intuition.mp3'/>;
}