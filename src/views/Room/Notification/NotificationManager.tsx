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
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};

export interface Notify {
    id?: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title?: any;
    message: any;
    timeOut: number;
    priority?: number;
    onClick?: any;
}


const myEmitter = new EventEmitter();
let listNotify: Notify[] = [];
export const create = (notify: Notify) => {
    const defaultNotify = {
        id: createUUID(),
        type: 'info',
        title: null,
        message: null,
        timeOut: 1000000
    };
    if (notify.priority) {
        listNotify.unshift(Object.assign(defaultNotify, notify));
    } else {
        listNotify.push(Object.assign(defaultNotify, notify));
    }
    emitChange();
}

export const info = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: number) => {
    create({
        // @ts-ignore
        type: Constants.INFO,
        message,
        title,
        timeOut,
        onClick,
        priority
    });
}

export const success = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: number) => {
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

export const warning = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: number) => {
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

export const error = (message?: any, title?: any, timeOut?: number, onClick?: () => void, priority?: number) => {
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

