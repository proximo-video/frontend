import React, {useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import '../../assets/scss/custom/roomChatMain.scss';
import MessageComponent from "./MessageComponent";
import {Message, User} from "./genericTypes";

// remove after testing
const loggedInUser = "389237982nikwebdj";

const initialMessages: Message[] = [
    {
        userId: "389237982nikwebdj",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis sollicitudin risus. Nullam sit amet diam efficitur est eleifend semper quis sodales tortor. Sed sed porta erat. Etiam accumsan finibus elementum. Pellentesque consequat aliquam velit vel pretium. Vestibulum in lacinia nibh. Quisque aliquam ullamcorper magna ac facilisis. Pellentesque ullamcorper justo sit amet tortor viverra interdum. Proin eget mauris mauris.\n" +
            "\n" +
            "Pellentesque fermentum vitae massa quis ornare. Suspendisse eget purus aliquam, porta purus eu, commodo sapien. Etiam eget quam orci. Pellentesque convallis accumsan rhoncus. Mauris risus sem, mollis vel odio at, elementum posuere lacus. Nam in velit sodales, sollicitudin tellus dictum, congue metus. Mauris vel arcu risus. Cras pulvinar hendrerit lacus ac tincidunt. Nullam eleifend odio at ante rutrum, id sollicitudin ante fringilla. Sed accumsan tellus id urna suscipit finibus. Phasellus tempus, ante vel aliquam lobortis, libero eros tempus augue, sed mattis massa mauris eget nulla. In orci nisl, accumsan id pellentesque id, pellentesque non tellus. Mauris auctor ligula nec fermentum dapibus. In in aliquet arcu. Aliquam felis enim, maximus at auctor sit amet, lobortis eu est.",
        displayName: "Phytoplankton bacteria",
    },
    {
        userId: "423454354efvre",
        message: "hello crap www.stackoverflow.com @SrBachchan",
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