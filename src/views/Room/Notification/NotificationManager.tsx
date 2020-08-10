import {EventEmitter} from 'events';

const createUUID = () => {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
};

const Constants = {
    CHANGE: 'change',
    MESSAGE: 'message',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};

export interface Notify {
    id?: string;
    type: 'message' | 'success' | 'warning' | 'error';
    title?: any;
    message: any;
    timeOut: number;
    priority?: boolean;
    onClick?: any;
}


const myEmitter = new EventEmitter();
let listNotify: Notify[] = [];
export const create = (notify: Notify) => {
    const defaultNotify = {
        id: createUUID(),
        type: 'MESSAGE',
        title: null,
        message: null,
        timeOut: 5000,
    };
    if (notify.priority) {
        listNotify.unshift(Object.assign(defaultNotify, notify));
    } else {
        listNotify.push(Object.assign(defaultNotify, notify));
    }
    emitChange();
}

export const Message = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: boolean) => {
    create({
        // @ts-ignore
        type: Constants.MESSAGE,
        message,
        title,
        timeOut,
        onClick,
        priority
    });
}

export const Success = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: boolean) => {
    create({
        // @ts-ignore
        type: Constants.SUCCESS,
        message,
        title,
        timeOut,
        onClick,
        priority
    });
}

export const Warning = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: boolean) => {
    create({
        // @ts-ignore
        type: Constants.WARNING,
        message,
        title,
        timeOut,
        onClick,
        priority
    });
}

export const Error = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: boolean) => {
    create({
        // @ts-ignore
        type: Constants.ERROR,
        message,
        title,
        timeOut,
        onClick,
        priority
    });
}

export const remove = (notification) => {
    listNotify = listNotify.filter(n => notification.id !== n.id);
    emitChange();
}

export const emitChange = () => {
    myEmitter.emit(Constants.CHANGE, listNotify);
}

export const addChangeListener = (callback) => {
    myEmitter.addListener(Constants.CHANGE, callback);
}

export const removeChangeListener = (callback) => {
    myEmitter.removeListener(Constants.CHANGE, callback);
}

