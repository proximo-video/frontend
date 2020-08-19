import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import Notification from './Notification';
import {Notify} from "./NotificationManager";

export interface NotificationsProps {
    notifications: Notify[];
    onRequestHide?: (i: any) => void;
    enterTimeout: number;
    exitTimeout: number;
    position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    containerClassName: string;
}

export default function Notifications(props: NotificationsProps) {

    const handleRequestHide = (notification: Notify) => {
        const { onRequestHide } = props;
        if (onRequestHide) {
            onRequestHide(notification);
        }
    };

    const { notifications, enterTimeout, exitTimeout } = props;
    const className = classnames('notification-container', {
        'notification-container-empty': notifications.length === 0
    }, props.position, props.containerClassName);

    return (
        <div className={className}>
            <TransitionGroup exit={true}>
                {notifications.map((notification: Notify) => {
                    const key = notification.id || new Date().getTime();
                    return (
                        <CSSTransition
                            key={key}
                            classNames={"notification-" + props.position}
                            timeout={{ enter: enterTimeout, exit: exitTimeout}}
                        >
                            <Notification
                                type={notification.type}
                                title={notification.title}
                                message={notification.message}
                                timeOut={notification.timeOut}
                                onClick={notification.onClick}
                                onRequestHide={() => handleRequestHide(notification)}
                                position={props.position}
                                requestMessage={notification.requestMessage}
                            />
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}

Notifications.defaultProps = {
    notifications: [],
    onRequestHide: () => {
    },
    enterTimeout: 400,
    exitTimeout: 400,
    position: 'bottom-left',
    containerClassName: '',
}
