import {FiMoreVertical} from "react-icons/fi";
import React, {useEffect, useState} from "react";

export function DropdownContent({backdropClick, options, dropdownClasses}) {
    let dropdown;
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!dropdown.contains(e.target))
            backdropClick();
    }
    useEffect(() => {
        dropdown = document.querySelector('.dropdown-content.show');
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);
    dropdownClasses = Array.isArray(dropdownClasses) ? dropdownClasses.join(' ') : dropdownClasses;
    return (
        <div className={"dropdown-content show " + (dropdownClasses !== void 0 ? dropdownClasses : '')}>
            {options.map((option, i) => (
                <div key={i} className={"option"} onClick={option.onClick}>
                    {option.prefixIcon}
                    <span>{option.label}</span>
                </div>
            ))}
        </div>
    );
}

export default function Dropdown({options, dropdownClasses}) {
    const [isClicked, setIsClicked] = useState(false);
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