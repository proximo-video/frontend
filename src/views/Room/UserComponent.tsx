import {User} from "./genericTypes";
import React from "react";

export interface UserComponentProps extends User {
    className?: string;
    avatarClassName?: string;
}

export function UserComponent(props: UserComponentProps) {

}

UserComponent.defaultProps = {
    className: '',
    avatarClassName: ''
}