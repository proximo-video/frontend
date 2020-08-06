import {FiMoreVertical} from 'react-icons/fi';
import React, {useEffect, useState} from 'react';
import DropdownOption from './expandedRoomData';

// export interface DropdownOption {
//     prefixIcon: React.FC;
//     label: string;
//     onClick: () => void;
// }

export interface DropdownContentProps extends DropdownProps {
    backdropClick: () => void;
}

export function DropdownContent({backdropClick, options, dropdownClasses}: DropdownContentProps) {
    let dropdown: Element;
    const handleClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!dropdown.contains(e.target))
            backdropClick();
    }
    useEffect(() => {
        dropdown = document.querySelector('.dropdown-content.show') as Element;
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);
    dropdownClasses = Array.isArray(dropdownClasses) ? dropdownClasses.join(' ') : dropdownClasses;
    return (
        <div className={"dropdown-content show " + (dropdownClasses !== void 0 ? dropdownClasses : '')}>
            {options.map((option: DropdownOption, i: number) => (
                <div key={i} className={"option"} onClick={option.onClick}>
                    {option.prefixIcon}
                    <span>{option.label}</span>
                </div>
            ))}
        </div>
    );
}

export interface DropdownProps {
    options: DropdownOption[];
    dropdownClasses?: string | string[];
}


export default function Dropdown({options, dropdownClasses}: DropdownProps) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleDropdownClick = () => {
        setIsClicked(true);
    }
    const backdropClick = () => {
        setIsClicked(false);
    }
    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={handleDropdownClick}>
                <FiMoreVertical/>
            </button>
            {isClicked &&
            <DropdownContent backdropClick={backdropClick} options={options} dropdownClasses={dropdownClasses}/>}
        </div>
    );
}