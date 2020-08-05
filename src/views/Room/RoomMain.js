import React from 'react';
import '../../assets/scss/custom/room.scss';
import {DropdownOption} from "./expandedRoomData";
import {FiMaximize, FiMaximize2} from "react-icons/fi";
import Dropdown from "../../components/elements/Dropdown";

function WebRTCMediaCell(props) {
    const normalOptionsMenu = [
        new DropdownOption(<FiMaximize2/>, 'Maximize', props.onMaximizeClick),
        new DropdownOption(<FiMaximize/>, 'Fullscreen', props.onFullscreenClick),
    ];
    return (
        <div className="video">
            <div className="inner">
                <Dropdown options={normalOptionsMenu}/>
                <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>
            </div>
        </div>
    );
}

export default function RoomMain(props) {
    const normalWebRTCMedia = [];
    for (let key of props.videoElements.keys()) {
        normalWebRTCMedia.push(<WebRTCMediaCell key={key} onMaximizeClick={() => props.onMaximizeClick(key)} onFullscreenClick={() => props.onFullscreenClick(key)}/>);
    }
    return (
        <>
            {normalWebRTCMedia}
        </>
    );
}