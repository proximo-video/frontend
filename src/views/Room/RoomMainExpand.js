import React from 'react';
import {FiMaximize2, FiMinimize2, FiMaximize} from "react-icons/fi";
import '../../assets/scss/custom/roomExpand.scss';
import Dropdown from "../../components/elements/Dropdown";
import {DropdownOption} from "./expandedRoomData";


function WebRTCMediaCell(props) {
    const normalOptionsMenu = [
        new DropdownOption(<FiMaximize2/>, 'Maximize', props.onMaximizeClick),
        new DropdownOption(<FiMaximize/>, 'Fullscreen', props.onFullscreenClick),
    ];
    return (
        <div className="webrtc-media-cell">
            <Dropdown options={normalOptionsMenu}/>
            <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>
        </div>
    );
}

export default function RoomMainExpand(props) {
    let maxOptionsMenu;
    let maxWebRTCMedia = null;
    const normalWebRTCMedia = [];
    for (let [key, value] of props.videoElements.entries()) {
        if (value.isMax) {
            maxWebRTCMedia =
                <video key={key} src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>;
            maxOptionsMenu = [
                new DropdownOption(<FiMinimize2/>, 'Minimize', () => props.onMaximizeClick(key)),
                new DropdownOption(<FiMaximize/>, 'Fullscreen', () => props.onFullscreenClick(key)),
            ];
        }
        else
            normalWebRTCMedia.push(<WebRTCMediaCell key={key} onMaximizeClick={() => props.onMaximizeClick(key)} onFullscreenClick={() => props.onFullscreenClick(key)}/>);
    }
    return (
        <>
            <div className="room-expanded">
                <Dropdown options={maxOptionsMenu}/>
                {maxWebRTCMedia}
            </div>
            <div className="side-video-container">
                {normalWebRTCMedia}
            </div>
        </>
    );
}