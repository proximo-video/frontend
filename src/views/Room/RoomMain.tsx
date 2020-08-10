import React, {ReactElement, useEffect, useState} from 'react';
// import '../../assets/scss/custom/room.scss';
// import '../../assets/scss/custom/roomExpand.scss';
// import '../../assets/scss/custom/roomFullscreen.scss';
// import '../../assets/scss/custom/room.scss';
import '../../assets/scss/custom/roomMain.scss';
import DropdownOption from "./expandedRoomDataType";
import {FiMaximize, FiMaximize2, FiMinimize, FiMinimize2} from "react-icons/fi";
import Dropdown from "./Dropdown";
import {VideoElement} from './videoDataType';
// import {RoomMainFullscreenProps} from "./RoomMainFullscreen";

declare global {
    interface Document {
        webkitIsFullScreen: any;
        mozFullScreen: any;
        msFullscreenElement: any;
    }
}

export interface WebRTCMediaCellProps {
    videoRef: any;
    onMaximizeClick: () => void;
    onFullscreenClick: () => void;
}

export function WebRTCMediaCell(props: WebRTCMediaCellProps) {
    const normalOptionsMenu: DropdownOption[] = [
        new DropdownOption(<FiMaximize2/>, 'Maximize', props.onMaximizeClick),
        new DropdownOption(<FiMaximize/>, 'Fullscreen', props.onFullscreenClick),
    ];
    return (
        <div className="video">
            <div className="inner">
                <Dropdown options={normalOptionsMenu}/>
                <video ref={props.videoRef} autoPlay className="video-stream"/>
            </div>
        </div>
    );
}

// export function useWindowSize() {
//     const [windowSize, setWindowSize] = useState({
//         width: undefined,
//         height: undefined,
//     });
//
//     useEffect(() => {
//         // Handler to call on window resize
//         function handleResize() {
//             // Set window width/height to state
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//         }
//
//         // Add event listener
//         window.addEventListener("resize", handleResize);
//
//         // Call handler right away so state gets updated with initial window size
//         handleResize();
//
//         // Remove event listener on cleanup
//         return () => window.removeEventListener("resize", handleResize);
//     }, []); // Empty array ensures that effect is only run on mount
//
//     return windowSize;
// }

function getWindowSize() {
    let windowSize = {
        height: window.innerHeight,
        width: window.innerWidth,
    }
    return windowSize;
}

// export interface RoomMainFullscreenProps {
//     fullscreenVideoId: string;
//     videoRef: any;
//     onFullscreenClick: (i: string) => void;
// }
//
//
// function RoomMainFullscreen(props: RoomMainFullscreenProps) {
//     // let fullscreenElement;
//     // let fullscreenWebRTCMedia: ReactElement | null = null;
//     // let fullscreenUserId:string = "";
//     const exitHandler = (e: any) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
//             props.onFullscreenClick(props.fullscreenVideoId);
//         }
//     };
//     useEffect(() => {
//         // fullscreenElement = document.querySelector('.room-fullscreen');
//         document.addEventListener('fullscreenchange', exitHandler);
//         document.addEventListener('webkitfullscreenchange', exitHandler);
//         document.addEventListener('mozfullscreenchange', exitHandler);
//         document.addEventListener('MSFullscreenChange', exitHandler);
//         // document.addEventListener('keydown', handleKeydown);
//         return () => {
//             document.removeEventListener('fullscreenchange', exitHandler);
//             document.removeEventListener('webkitfullscreenchange', exitHandler);
//             document.removeEventListener('mozfullscreenchange', exitHandler);
//             document.removeEventListener('MSFullscreenChange', exitHandler);
//             // document.removeEventListener('keydown', handleKeydown);
//         }
//         // eslint-disable-next-line
//     }, []);
//
//     // if (props.videoElements.has(props.fullscreenVideoId)) {
//     //     fullscreenWebRTCMedia = <video ref={props.videoElements.get(props.fullscreenVideoId).videoRef} autoPlay className="video-stream"/>;
//     // }
//
//     return (
//         <div className={"fullscreen"}>
//             <div className="inner">
//                 <div className="exit-fullscreen" onClick={() => props.onFullscreenClick(props.fullscreenVideoId)}>
//                     <FiMinimize/>
//                     <span>Exit full screen</span>
//                 </div>
//                 <video ref={props.videoRef} autoPlay className="video-stream"/>
//                 {/*<video className="video-stream" poster={"/images/big_buck_bunny.jpg"}/>*/}
//             </div>
//         </div>
//     );
// }


export interface RoomMainProps {
    videoElements: Map<string, VideoElement>;
    onMaximizeClick: (i: string) => void;
    onFullscreenClick: (i: string) => void;
    maxVideoId: string;
    fullscreenVideoId: string;
}

export default function RoomMain(props: RoomMainProps) {
    const webRTCMedia: ReactElement[] = [];
    let countNormalWebRTCMedia: number = 0;
    // const size = useWindowSize();
    const size = getWindowSize();
    const maximiseDoubleClick = (element: any) => {
        element.target.className.toggle('room-fullscreen');
    }

    const exitHandler = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            props.onFullscreenClick(props.fullscreenVideoId);
        }
    };

    useEffect(() => {
        // fullscreenElement = document.querySelector('.room-fullscreen');
        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener('webkitfullscreenchange', exitHandler);
        document.addEventListener('mozfullscreenchange', exitHandler);
        document.addEventListener('MSFullscreenChange', exitHandler);
        // document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('fullscreenchange', exitHandler);
            document.removeEventListener('webkitfullscreenchange', exitHandler);
            document.removeEventListener('mozfullscreenchange', exitHandler);
            document.removeEventListener('MSFullscreenChange', exitHandler);
            // document.removeEventListener('keydown', handleKeydown);
        }
        // eslint-disable-next-line
    }, []);

    let maxMediaStyle: React.CSSProperties;
    if (size.width > 700) {
        maxMediaStyle = {
            width: '75%',
            height: '100%',
            padding: '5px',
        }
    } else if (size.width > 415) {
        maxMediaStyle = {
            width: '100%',
            height: '75%',
            padding: '2px',
        }
    } else {
        maxMediaStyle = {
            width: '100%',
            height: '80%',
            padding: '2px',
        }
    }

    props.videoElements.forEach((value: VideoElement, key: string) => {
        const maxOptionsMenu = [
            new DropdownOption(<FiMinimize2/>, 'Minimize', () => props.onMaximizeClick(key)),
            new DropdownOption(<FiMaximize/>, 'Fullscreen', () => props.onFullscreenClick(key)),
        ];
        const normalOptionsMenu: DropdownOption[] = [
            new DropdownOption(<FiMaximize2/>, 'Maximize', () => props.onMaximizeClick(key)),
            new DropdownOption(<FiMaximize/>, 'Fullscreen', () => props.onFullscreenClick(key)),
        ];
        let normalMediaStyle: React.CSSProperties;
        if (size.width > 700) {
            const top: number = countNormalWebRTCMedia * 33;
            normalMediaStyle = {
                top: top.toString() + "%",
                right: 0,
                width: '25%',
                height: '33%',
                padding: '5px',
            };
        } else {
            const left: number = countNormalWebRTCMedia * 33;
            normalMediaStyle = {
                left: left.toString() + "%",
                bottom: 0,
                width: '33%',
                padding: '2px',
            };
            if (size.width > 415)
                normalMediaStyle.height = '25%';
            else
                normalMediaStyle.height = '20%';
        }
        webRTCMedia.push(
            <div
                key={key}
                className={(props.fullscreenVideoId === key ? 'fullscreen' : (props.maxVideoId === '' ? "video" : (props.maxVideoId === key ? "expanded" : "webrtc-media-cell")))}
                style={(props.maxVideoId !== '' ? (props.maxVideoId !== key ? normalMediaStyle : maxMediaStyle) : {})}
            >
                <div className="inner">
                    {
                        props.fullscreenVideoId === key ?
                        <div className="exit-fullscreen"
                             onClick={() => props.onFullscreenClick(props.fullscreenVideoId)}>
                            <FiMinimize/>
                            <span>Exit full screen</span>
                        </div> :
                        <Dropdown options={key === props.maxVideoId ? maxOptionsMenu : normalOptionsMenu}/>
                    }
                    {/*<video ref={value.videoRef} autoPlay className="video-stream"/>*/}
                    <video onDoubleClick={maximiseDoubleClick} className="video-stream" poster={"/images/big_buck_bunny.jpg"}/>
                </div>
            </div>
        );
        if (props.maxVideoId !== '' && props.maxVideoId !== key)
            countNormalWebRTCMedia += 1;
    });
    return (
        <>
            {webRTCMedia}
        </>
    );
}