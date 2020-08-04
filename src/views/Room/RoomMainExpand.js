import React from 'react';
import {FiMoreVertical} from "react-icons/fi";
import '../../assets/scss/custom/roomExpand.scss';
import Dropdown from "../../components/elements/Dropdown";
import {DropdownOption} from "./expandedRoomData";

function WebRTCMediaCell() {
    const optionsMenu = [
        new DropdownOption(<FiMoreVertical/>, 'something', () => console.log("clicked something")),
        new DropdownOption(<FiMoreVertical/>, 'something', () => console.log("clicked something")),
    ]
    return (
        <div className="webrtc-media-cell">
            <Dropdown options={optionsMenu}/>
            <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>
        </div>
    );
}

export default function RoomMainExpand(props) {
    let maxWebRTCMedia = null;
    const normalWebRTCMedia = [];
    for (let [key, value] of props.videoElements.entries()) {
        if (value.isMax)
            maxWebRTCMedia =
                <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>;
        else
            normalWebRTCMedia.push(<WebRTCMediaCell key={key}/>);
    }
    return (
        <>
            <div className="room-expanded">
                {maxWebRTCMedia}
            </div>
            <div className="side-video-container">
                {normalWebRTCMedia}
            </div>
        </>
    );
}