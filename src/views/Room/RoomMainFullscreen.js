import {DropdownOption} from "./expandedRoomData";
import {FiMinimize} from "react-icons/fi";
import React, {useEffect} from "react";
import '../../assets/scss/custom/roomFullscreen.scss';


export default function RoomMainFullscreen(props) {
    // let fullscreenElement;
    let fullscreenWebRTCMedia = null;
    let fullscreenUserId = "";
    const exitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log("Existing fullscreen mode:", fullscreenUserId);
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

    for (let [key, value] of props.videoElements.entries()) {
        if (value.isFullscreen) {
            fullscreenUserId = key;
            fullscreenWebRTCMedia =
                <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>;
        }
    }

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
