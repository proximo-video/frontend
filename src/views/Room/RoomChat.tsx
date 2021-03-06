import React, {useEffect, useState, useRef} from "react";
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'
import {FiSmile} from 'react-icons/fi';
import ChatMain from "./ChatMain";
import {useSelector,useDispatch, RootStateOrAny} from 'react-redux';
import {sendMessage} from '../../redux/actions';

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
        // eslint-disable-next-line
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
    // let textarea: Element;
    const dispatch = useDispatch();
    const id = useSelector((state: RootStateOrAny) => state.id);
    const formRef = useRef();
    const [inputValue, setInputValue] = useState<string>('');
    const [isEmojiContainerOpen, setIsEmojiContainerOpen] = useState<boolean>(false);
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
        event.stopPropagation();
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let messageValue = inputValue.trim();
        if(messageValue !== '') {
            const len = messageValue.length;
            if (len>8000) {
                messageValue = messageValue.substr(0, 8000);
                // Warning("chat-warning", "Your message is too long.", 'Warning', 3000);
                alert("Your message is too long.");
            }
            dispatch(sendMessage({id: id, action: 'MESSAGE', message: messageValue}));
        }
        setInputValue('');
    };

    const onEnterPress = (event: any) => {
        if(event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            // formRef.submit();
            handleSubmit(event);
        }
    }

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
                    <div className="title">Meeting Details</div>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="chat-main">
                    {/*<NotificationContainer id={"chat-warning"} position={"top-right"}/>*/}
                    <ChatMain/>
                    {isEmojiContainerOpen && <EmojiContainer addEmoji={addEmoji} handleEmojiOpenButton={handleEmojiOpenButton}/>}
                </div>
                <div className="chat-footer">
                    <form action='#' ref={formRef} onSubmit={handleSubmit} id={"chat-form"}>
                        <div className={"emoji-open-button"}><FiSmile onClick={handleEmojiOpenButton}/></div>
                        <textarea onKeyDown={onEnterPress} className={"chat-message-input"} placeholder={"Send a chat message..."}
                               value={inputValue} onChange={handleInputChange}/>
                        <input type={"submit"} className={"chat-send-button"} value={"Send"}/>
                    </form>
                </div>
            </div>

            {/*{isChatOpen && <ChatBackdrop backdropClick={backdropClick}/>}*/}
        </>
    );
}