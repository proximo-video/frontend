import {FiMinimize} from "react-icons/fi";
import React, {ReactElement, useEffect} from "react";
import '../../assets/scss/custom/roomFullscreen.scss';
import {RoomMainExpandProps} from "./RoomMainExpand";
import {VideoElement} from "./videoData";

declare global {
    interface Document {
        webkitIsFullScreen: any;
        mozFullScreen: any;
        msFullscreenElement: any;
    }
}

export default function RoomMainFullscreen(props: RoomMainExpandProps) {
    // let fullscreenElement;
    let fullscreenWebRTCMedia: ReactElement | null = null;
    let fullscreenUserId:string = "";
    const exitHandler = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            props.onFullscreenClick(fullscreenUserId);
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
    }, []);
    props.videoElements.forEach((value: VideoElement, key: string) => {
        if (value.isFullscreen) {
            fullscreenUserId = key;
            fullscreenWebRTCMedia =
                <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>;
        }
    });
    return (
        <div className={"room-fullscreen"}>
            <div className="exit-fullscreen" onClick={() => props.onFullscreenClick(fullscreenUserId)}>
                <FiMinimize/>
                <span>Exit full screen</span>
            </div>
            {fullscreenWebRTCMedia}
        </div>
    )
}
