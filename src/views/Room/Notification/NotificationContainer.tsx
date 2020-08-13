import React, {useEffect, useState} from 'react';
import {addChangeListener, Notify, remove, removeChangeListener} from './NotificationManager';
import Notifications from './Notifications';

export interface NotificationContainerProps {
    enterTimeout: number;
    exitTimeout: number;
    position: 'bottom-left' | 'bottom-right' | 'top-right' | 'top-left';
    id: string;
}

export default function NotificationContainer(props: NotificationContainerProps) {
    const [notifications, setNotifications] = useState<Notify[]>([]);

    useEffect(() => {
        addChangeListener(handleStoreChange);
        return () => {
            removeChangeListener(handleStoreChange);
        }
        // eslint-disable-next-line
    }, []);

    const handleStoreChange = (notifications: Notify[]) => {
        const newNotifications: Notify[] = [];
        notifications.forEach((notification: Notify) => {
            if(notification.targetId === props.id)
                newNotifications.push(notification);
        });
        setNotifications(newNotifications);
    };

    const handleRequestHide = (notification: Notify) => {
        remove(notification);
    };

    const { enterTimeout, exitTimeout } = props;

    return (
        <Notifications
            enterTimeout={enterTimeout}
            exitTimeout={exitTimeout}
            notifications={notifications}
            onRequestHide={handleRequestHide}
            position={props.position}
        />
    );
}

NotificationContainer.defaultProps = {
    enterTimeout: 400,
    exitTimeout: 400,
    position: 'bottom-left',
}