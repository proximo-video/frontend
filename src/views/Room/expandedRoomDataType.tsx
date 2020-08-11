import {ReactElement} from "react";

export default class DropdownOption {
    label: string;

    onClick(): void {
    }

    prefixIcon: ReactElement;

    className: string;

    constructor(prefixIcon: ReactElement, label: string, onClick: () => void, className: string = '') {
        this.prefixIcon = prefixIcon;
        this.label = label;
        this.onClick = onClick;
        this.className = className;
    }
}

// export class DropdownOption implements DropdownInter  {
//     // this.age: number;
//     // name: string;
//     constructor() {
//         super();
//         this.age = 5;
//     }
// }

// export const optionsMenu = [
//     new DropdownOption(<FiMoreVertical/>, 'something', () => console.log("clicked something")),
// ]