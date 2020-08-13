import React, {useEffect, useState} from 'react';
import {addChangeListener, remove, removeChangeListener} from './NotificationManager';
import Notifications from './Notifications';

export interface NotificationContainerProps {
    enterTimeout: number;
    exitTimeout: number;
    position: 'bottom-left' | 'bottom-right' | 'top-right' | 'top-left';
}

export default function NotificationContainer(props: NotificationContainerProps) {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        addChangeListener(handleStoreChange);
        return () => {
            removeChangeListener(handleStoreChange);
        }
    }, []);

    const handleStoreChange = (notifications) => {
        setNotifications(notifications);
    };

    const handleRequestHide = (notification) => {
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