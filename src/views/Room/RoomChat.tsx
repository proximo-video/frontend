import React, {useEffect, useState} from "react";
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'
import {FiSmile} from 'react-icons/fi';
import ChatMain from "./ChatMain";

// function ChatBackdrop({backdropClick}) {
//     let sideChat: Element;
//     const handleClick = (e: any) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (!sideChat.contains(e.target))
//             backdropClick();
//     }
//     useEffect(() => {
//         sideChat = document.querySelector('.room-chat.open') as Element;
//         document.addEventListener('click', handleClick);
//         return () => {
//             document.removeEventListener('click', handleClick);
//         }
//     }, []);
//     return null;
// }

export function EmojiContainer({handleEmojiOpenButton, addEmoji}) {
    let emojiContainer: Element;

    const handleClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!emojiContainer.contains(e.target))
            handleEmojiOpenButton();
    };

    useEffect( () => {
        emojiContainer = document.querySelector('.emoji-container') as Element;
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    });
    return (
        <span className={"emoji-container"}>
            <Picker onSelect={addEmoji} title="proximo-video" theme={'dark'} showPreview={false} showSkinTones={false} defaultSkin={2} skin={2}/>
        </span>
    );
}

export default function RoomChat({isChatOpen, onClose}) {
    const [inputValue, setInputValue] = useState<string>('');
    const [isEmojiContainerOpen, setIsEmojiContainerOpen] = useState<boolean>(false);
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
        setInputValue('');
        // alert("your message:" + inputValue);
        console.log("your message: " + inputValue);
        event.preventDefault();
    };

    const addEmoji = (event: any) => {
        let emoji = event.native;
        setInputValue(inputValue + emoji);
    };

    const handleEmojiOpenButton = () => {
        setIsEmojiContainerOpen(!isEmojiContainerOpen);
    }

    return (
        <>
            <div className={"room-chat" + (isChatOpen ? " open" : "")}>
                <div className="chat-header">
                    <div className="title">Chat</div>
                    <div>X</div>
                </div>
                <div className="chat-main">
                    <ChatMain/>
                    {isEmojiContainerOpen && <EmojiContainer addEmoji={addEmoji} handleEmojiOpenButton={handleEmojiOpenButton}/>}
                </div>
                <div className="chat-footer">
                    <form onSubmit={handleSubmit}>
                        <div className={"emoji-open-button"}><FiSmile onClick={handleEmojiOpenButton}/></div>
                        <input type={"text"} className={"chat-message-input"} placeholder={"Send a chat message..."}
                               value={inputValue} onChange={handleInputChange}/>
                        <input type={"submit"} className={"chat-send-button"} value={"submit"}/>
                    </form>
                </div>
            </div>

            {/*{isChatOpen && <ChatBackdrop backdropClick={backdropClick}/>}*/}
        </>
    );
}