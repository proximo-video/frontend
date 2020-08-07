import React, {useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import '../../assets/scss/custom/roomChatMain.scss';
import Avatar from "./Avatar";


// remove after testing
const loggedInUser = "389237982nikwebdj";

export interface User {
    userId: string;
    displayName: string;
}

export interface Message extends User {
    message: string;
}

const initialMessages: Message[] = [
    {
        userId: "389237982nikwebdj",
        message: "hello",
        displayName: "Phytoplankton bacteria",
    },
    {
        userId: "423454354efvre",
        message: "hello crap",
        displayName: "Random dude",
    }
];

const initialUser: User[] = [
    {
        userId: "389237982nikwebdj",
        displayName: "Phytoplankton bacteria",
    },
    {
        userId: "423454354efvre",
        displayName: "Random dude",
    }
];

function urlify(text) {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
}

export interface MessageComponentProps extends Message {
    avatarPosition?: string;
    className?: string;
    avatarClassName?: string;
    messageBodyClassName?: string;
}

export function MessageComponent({message, displayName, avatarPosition, className, avatarClassName, messageBodyClassName}: MessageComponentProps) {
    return (
        <div className={className + ' message-component'}>
            {
                avatarPosition === 'left' ?
                    <>
                        <Avatar name={displayName} size={"30px"} className={avatarClassName + ' avatar'}/>
                        <p className={messageBodyClassName + ' message-body-container'}>{urlify(message)}</p>
                    </>
                    :
                    <>
                        <p className={messageBodyClassName + ' message-body-container'}>{urlify(message)}</p>
                        <Avatar name={displayName} size={"30px"} className={avatarClassName + ' avatar'}/>
                    </>
            }
        </div>
    );
}

MessageComponent.defaultProps = {
    avatarPosition: 'left',
    className: '',
    avatarClassName: '',
    messageBodyClassName: ''
}

export function MessageArea() {
    const [chatMessages, setChatMessages] = useState<Message[]>(initialMessages);
    return (
        <>
            {chatMessages.map((Mess: Message) =>
                <div className={"message-container" + (Mess.userId === loggedInUser ? " right" : "")}>
                    {
                        Mess.userId === loggedInUser ?
                        <MessageComponent messageBodyClassName={'right'} avatarPosition={'right'} userId={Mess.userId} message={Mess.message} displayName={Mess.displayName}/>:
                        <MessageComponent messageBodyClassName={'left'} avatarPosition={'left'} userId={Mess.userId} message={Mess.message} displayName={Mess.displayName}/>
                    }
                </div>
            )}
        </>
    );
}

export function UserArea() {
    const [user, setUser] = useState<User[]>(initialUser);
    return (
        <div/>
    );
}

export default function ChatMain(props) {
    return (
        <Tabs>
            <TabList>
                <Tab>Chat</Tab>
                <Tab>People</Tab>
            </TabList>
            <TabPanel className={"message-area"}>
                <MessageArea/>
            </TabPanel>
            <TabPanel>
                <UserArea/>
            </TabPanel>
        </Tabs>
    );
}