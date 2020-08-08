import React, {ReactElement} from 'react';
import {FiVideoOff, FiVideo, FiMic, FiMicOff, FiMonitor, FiMessageSquare} from "react-icons/fi";
import {FaRegHandSpock} from "react-icons/fa";

export interface ButtonsDataType {
    onIcon: ReactElement;
    offIcon: ReactElement;
    onLegend: string;
    offLegend: string;
    onIconColor: string;
    offIconColor: string;
    onClass: string;
    offClass: string;
    isOff: boolean;
}


export const buttonsData: ButtonsDataType[] = [
    {
        onIcon: <FiVideo/>,
        offIcon: <FiVideoOff/>,
        onLegend: "Cam",
        offLegend: "Cam",
        onIconColor: "white",
        offIconColor: "white",
        onClass: "",
        offClass: "isOff",
        isOff: false,
    },
    {
        onIcon: <FiMic/>,
        offIcon: <FiMicOff/>,
        onLegend: "Mic",
        offLegend: "Mic",
        onIconColor: "white",
        offIconColor: "white",
        onClass: "",
        offClass: "isOff",
        isOff: false,
    },
    {
        onIcon: <FiMonitor/>,
        offIcon: <FiMonitor/>,
        onLegend: "Stop",
        offLegend: "Share",
        onIconColor: "#f26b4d",
        offIconColor: "white",
        onClass: "",
        offClass: "",
        isOff: true,
    },
    {
        onIcon: <FiMessageSquare/>,
        offIcon: <FiMessageSquare/>,
        onLegend: "Chat",
        offLegend: "Chat",
        onIconColor: "white",
        offIconColor: "white",
        onClass: "",
        offClass: "",
        isOff: false
    },
    {
        onIcon: <FaRegHandSpock/>,
        offIcon: <FaRegHandSpock/>,
        onLegend: "Leave",
        offLegend: "Leave",
        onIconColor: "#f26b4d",
        offIconColor: "#f26b4d",
        onClass: "",
        offClass: "",
        isOff: false
    },
]