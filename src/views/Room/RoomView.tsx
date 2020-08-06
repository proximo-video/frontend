import '../../assets/scss/custom/room.scss';
import React, {useState} from 'react';
import "./RoomFooter";
import RoomFooter from './RoomFooter';
import {videoData, VideoElement} from './videoData';
import RoomMainExpand from './RoomMainExpand';
import RoomMain from "./RoomMain";
import RoomMainFullscreen from "./RoomMainFullscreen";
import RoomChat from "./RoomChat";

declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}

function RoomView() {
    // 5 buttons 0=>cam, 1=>mic, 2=>screen, 3=>chat, 4=>leave, buttons array denoting the 
    const [buttonsState, setButtonsState] = useState<boolean[]>([false, false, true, false, false]);
    const [videoElements, setVideoElements] = useState<Map<string, VideoElement>>(videoData);
    const [isAnyVideoMax, setIsAnyVideoMax] = useState<boolean>(false);
    const [isAnyVideoFullscreen, setIsAnyVideoFullscreen] = useState<boolean>(false);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    const handleButtonClick = (i: number) => {
        const newButtonsState = buttonsState.slice();
        newButtonsState[i] = !buttonsState[i];
        setButtonsState(newButtonsState);
        if (i === 3)
            setIsChatOpen(newButtonsState[i]);
    };

    const isMobile = () => {
        return window.innerWidth <= 700;
    };

    const setVideosLayout = (n: number) => {
        const cont = document.querySelector<HTMLElement>(':root') as HTMLElement;
        let perRow = Math.ceil(Math.sqrt(n));
        if (isMobile()) {
            if (n === 2)
                perRow = 1;
            else
                perRow = 2;
        }
        cont.style.setProperty('--per-row', perRow.toString());
        const noOfRows = Math.ceil(n / perRow);
        cont.style.setProperty('--rows', noOfRows.toString());
    };

    const addUser = () => {
        // generate some random key, para and title
        const userId = Math.random().toString(36).slice(2);
        const newVideoElement = new VideoElement(null, false, false, userId, "crap");
        setVideosLayout(videoElements.size + 1);
        setVideoElements(new Map(videoElements.set(userId, newVideoElement)));
    };


    const handleMaximizeButtonClick = (userId: string) => {
        if (videoElements.has(userId) && videoElements.size > 1) {
            const newVideoElements = new Map<string, VideoElement>(videoElements);
            newVideoElements.get(userId).isMax = !videoElements.get(userId).isMax;
            setIsAnyVideoMax(newVideoElements.get(userId).isMax);
            newVideoElements.forEach((value: VideoElement, key: string) => {
                if (key !== userId)
                    newVideoElements.get(key).isMax = false;
            });
            setVideoElements(newVideoElements);
        }
    };

    const handleFullscreenButtonClick = async (userId) => {
        if (videoElements.has(userId)) {
            // console.log("fullscreen request from user:", userId);
            const newVideoElements = new Map(videoElements);
            newVideoElements.get(userId).isFullscreen = !videoElements.get(userId).isFullscreen;
            newVideoElements.forEach((value: VideoElement, key: string) => {
                if (key !== userId)
                    newVideoElements.get(key).isFullscreen = false;
            });
            if (newVideoElements.get(userId).isFullscreen) {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    await elem.requestFullscreen();
                } else if (elem.mozRequestFullscreen) { /* Firefox */
                    await elem.mozRequestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    await elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    await elem.msRequestFullscreen();
                }
                // await document.documentElement.requestFullscreen();
            } else if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    await document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    await document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    await document.msExitFullscreen();
                }
            }
            setIsAnyVideoFullscreen(newVideoElements.get(userId).isFullscreen);
            setVideoElements(newVideoElements);
        }
    }

    const backdropClick = () => {
        console.log("BackDropclick:");
        const newButtonsState = buttonsState.slice();
        setIsChatOpen(false);
        newButtonsState[3] = false;
        setButtonsState(newButtonsState);
    };

    // const handleDeleteUser = (userId) => {
    //     if(videoElements.has(userId)) {
    //         if(videoElements.get(userId).isMax)
    //             setIsAnyVideoMax(false);
    //         setVideoElements(new Map(getDeletedMap(videoElements, userId)));
    //     }
    // };
    //
    // const getDeletedMap = (videoElements, userId) => {
    //     videoElements.delete(userId);
    //     return videoElements;
    // };

    return (
        <div className="room-main">
            <div className={"video-container" + (isChatOpen ? " chat-open" : "")}>
                {
                    isAnyVideoFullscreen ?
                        <RoomMainFullscreen videoElements={videoElements}
                                            onMaximizeClick={(userId: string) => handleMaximizeButtonClick(userId)}
                                            onFullscreenClick={(userId: string) => handleFullscreenButtonClick(userId)}/> : (
                            isAnyVideoMax ?
                                <RoomMainExpand videoElements={videoElements}
                                                onMaximizeClick={(userId: string) => handleMaximizeButtonClick(userId)}
                                                onFullscreenClick={(userId: string) => handleFullscreenButtonClick(userId)}/> :
                                <RoomMain videoElements={videoElements}
                                          onMaximizeClick={(userId: string) => handleMaximizeButtonClick(userId)}
                                          onFullscreenClick={(userId: string) => handleFullscreenButtonClick(userId)}/>)
                }
            </div>
            <RoomChat isChatOpen={isChatOpen} onClose={backdropClick}/>
            <button className="button is-primary addVideo" onClick={() => addUser()}>Primary</button>
            <RoomFooter buttonsState={buttonsState} onClick={(i: number) => handleButtonClick(i)}/>
        </div>
    );
}

export default RoomView;