import {User} from "./genericTypes";
import React from "react";
import Avatar from "./Avatar";

export interface UserComponentProps extends User {
    className?: string;
    avatarClassName?: string;
}

export default function UserComponent({userId, displayName, className, avatarClassName}: UserComponentProps) {
    return (
        <div className={className + ' user-component'}>
            <Avatar round={true} name={displayName} className={avatarClassName + 'avatar'}/>
            <p className={'user-name'}>{displayName}</p>
        </div>
    );
}

UserComponent.defaultProps = {
    className: '',
    avatarClassName: ''
}