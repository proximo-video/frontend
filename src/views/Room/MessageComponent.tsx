import Avatar from "./Avatar";
import React from "react";
import Linkify from 'react-linkify';
import {Message} from "./genericTypes";


export interface MessageComponentProps extends Message {
    avatarPosition?: string;
    className?: string;
    avatarClassName?: string;
    messageBodyClassName?: string;
    displayName?: string;
}

export default function MessageComponent({message, displayName, avatarPosition, className, avatarClassName, messageBodyClassName}: MessageComponentProps) {
    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );
    return (
        <div className={className + ' message-component'}>
            {
                avatarPosition === 'left' ?
                    <>
                        <Avatar round={true} name={displayName} className={avatarClassName + ' avatar'}/>
                        <Linkify componentDecorator={componentDecorator}><p className={messageBodyClassName + ' message-body-container'}>{message}</p></Linkify>
                    </>
                    :
                    <>
                        <Linkify componentDecorator={componentDecorator}><p className={messageBodyClassName + ' message-body-container'}>{message}</p></Linkify>
                        <Avatar round={true} name={displayName} className={avatarClassName + ' avatar'}/>
                    </>
            }
        </div>
    );
}

MessageComponent.defaultProps = {
    avatarPosition: 'left',
    className: '',
    avatarClassName: '',
    messageBodyClassName: ''
}