import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import '../../assets/scss/custom/roomChat.scss';
import MessageComponent from "./MessageComponent";
import { Message } from "./genericTypes";
import UserComponent from "./UserComponent";
import { messages } from '../../middleware/webRTC';
import { useSelector, RootStateOrAny } from 'react-redux';

// remove after testing
const loggedInUser = "389237982nikwebdj";


export function MessageArea() {
    // eslint-disable-next-line
    let messagesEnd: Element;

    const scrollToBottom = () => {
        messagesEnd.scrollIntoView();
    };

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div>
            {
                messages.map((Mess: Message, key: number) =>
                    <div key={key} className={"message-container" + (Mess.id === loggedInUser ? " right" : "")}>
                        {
                            Mess.id === loggedInUser ?
                                <MessageComponent messageBodyClassName={'right'} avatarPosition={'right'}
                                    id={Mess.id} message={Mess.message}
                                    displayName={"Mess.displayName"} /> :
                                <MessageComponent messageBodyClassName={'left'} avatarPosition={'left'}
                                    id={Mess.id} message={Mess.message}
                                    displayName={'Mess.displayName'} />
                        }
                    </div>
                )
            }
            <div style={{ float: "left", clear: "both" }} ref={(el) => { messagesEnd = el; }} />
        </div>
    );
}

export function UserArea() {
    // eslint-disable-next-line
    const users = useSelector((state: RootStateOrAny) => state.remoteUsers)
    const id = useSelector((state: RootStateOrAny) => state.id)
    const name = useSelector((state: RootStateOrAny) => state.name)
    return (
        <>

            <UserComponent id={id} displayName={name} />
            {
                Object.entries(users).map((value: any,key:number) =>
                    <UserComponent key={key} id={value[0]} displayName={value[1]} />
                )
            }
        </>
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
                <MessageArea />
            </TabPanel>
            <TabPanel className={"user-area"}>
                <UserArea />
            </TabPanel>
        </Tabs>
    );
}