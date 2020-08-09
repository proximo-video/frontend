import React, {useState} from "react";
import MessageComponent from "./MessageComponent";

export interface SnackbarProps {
    className?: string;
    position?: string;
    color?: string;
    children: any;
}

export function Snackbar({children, className, position, color}: SnackbarProps) {
    let left, right, top, bottom : string = '';
    let offset: string = '15px';
    switch (position) {
        case 'bottom-center':
            bottom = offset;
            left = '50%';
            break;
        case 'top-center':
            top = offset;
            left = '50%';
            break;
        case 'top-right':
            top = offset;
            right = offset;
            break;
        case 'bottom-right':
            bottom = offset;
            right = offset;
            break;
        case 'bottom-left':
            bottom = offset;
            left = offset;
            break;
        case 'top-left':
            top = offset;
            left = offset;
            break;
    }
    const snackbarStyles = {
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        color: (color ?? '')
    };
    return (
        <div className={className + ' snackbar'} style={snackbarStyles}>
            {children}
        </div>
    );
}

Snackbar.defaultProps = {
    className: '',
    position: 'bottom-center',
    value: ''
}

export interface MessageSnackbarProps {

}

export default function MessageSnackbar(props: MessageSnackbarProps) {
    // let snackbarRef: Element;
    const [message, setMessage] = useState<string>('');
    // const [classname, setClassname] = useState<string>('');
    const handleClick = () => {
        const userId = Math.random().toString(36).slice(2);
        setMessage(userId);
        // setClassname('show');
    }
    return (
        <div>
            <button className={"temp-button"} onClick={handleClick} style={{position:"absolute", top: 0}}>Mess</button>
            {/* <TransitionGroup
                className='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <Snackbar position={"bottom-left"} className={"message-snackbar"}>
                    <MessageComponent userId={"342432412rtr"} message={"www.stackoverflow.com There are many variations " + message} displayName={"oh crap"} messageBodyClassName={"side-message-body"}/>
                </Snackbar>
            </TransitionGroup> */}
        </div>
    );
}