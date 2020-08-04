import {FiMoreVertical} from "react-icons/fi";
import React from "react";

export function DropdownOption(prefixIcon, label, onClick) {
    this.prefixIcon = prefixIcon;
    this.label = label;
    this.onClick = onClick;
}

// export const optionsMenu = [
//     new DropdownOption(<FiMoreVertical/>, 'something', () => console.log("clicked something")),
//     new DropdownOption(<FiMoreVertical/>, 'something', () => console.log("clicked something")),
// ]