import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import Notification from './Notification';

export interface NotificationsProps {
    notifications: any[];
    onRequestHide?: (i: any) => void;
    enterTimeout: number;
    exitTimeout: number;
}

export default function Notifications(props: NotificationsProps) {

    const handleRequestHide = (notification) => {
        const { onRequestHide } = props;
        if (onRequestHide) {
            onRequestHide(notification);
        }
    };

    const { notifications, enterTimeout, exitTimeout } = props;
    const className = classnames('notification-container', {
        'notification-container-empty': notifications.length === 0
    });

    return (
        <div className={className}>
            <TransitionGroup exit={true}>
                {notifications.map((notification: any) => {
                    const key = notification.id || new Date().getTime();
                    return (
                        <CSSTransition
                            key={key}
                            classNames="notification"
                            timeout={{ enter: enterTimeout, exit: exitTimeout}}
                        >
                            <Notification
                                type={notification.type}
                                title={notification.title}
                                message={notification.message}
                                timeOut={notification.timeOut}
                                onClick={notification.onClick}
                                onRequestHide={() => handleRequestHide(notification)}
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
    exitTimeout: 400
}
