import React, {useEffect, useState} from 'react';
import {addChangeListener, remove, removeChangeListener} from './NotificationManager';
import Notifications from './Notifications';

export interface NotificationContainerProps {
    enterTimeout: number;
    leaveTimeout: number;
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

    const { enterTimeout, leaveTimeout } = props;

    return (
        <Notifications
            enterTimeout={enterTimeout}
            leaveTimeout={leaveTimeout}
            notifications={notifications}
            onRequestHide={handleRequestHide}
        />
    );
}

NotificationContainer.defaultProps = {
    enterTimeout: 400,
    leaveTimeout: 400,
}