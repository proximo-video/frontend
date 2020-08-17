import {FiMoreVertical} from 'react-icons/fi';
import React, {useEffect, useState} from 'react';
import DropdownOption from './expandedRoomDataType';
import classnames from 'classnames';

// export interface DropdownOption {
//     prefixIcon: React.FC;
//     label: string;
//     onClick: () => void;
// }

export interface DropdownContentProps extends DropdownProps {
    backdropClick: () => void;
    backdropRequired: boolean;
}

export function DropdownContent({backdropClick, options, dropdownClasses, backdropRequired}: DropdownContentProps) {
    // let dropdown: Element;
    const handleClick = (e: any) => {
        // e.preventDefault();
        e.stopPropagation();
        // if (!dropdown.contains(e.target))
        if (backdropRequired)
            backdropClick();
    }
    useEffect(() => {
        // eslint-disable-next-line
        // dropdown = document.querySelector('.dropdown-content.show') as Element;
        if (backdropRequired)
            document.addEventListener('click', handleClick);
        return () => {
            if (backdropRequired)
                document.removeEventListener('click', handleClick);
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className={classnames("dropdown-content", dropdownClasses)}>
            {options.map((option: DropdownOption, i: number) => (
                <div key={i} className={classnames("option", option.className)} onClick={option.onClick}>
                    {option.prefixIcon}
                    <span>{option.label}</span>
                </div>
            ))}
        </div>
    );
}

DropdownContent.defaultProps = {
    backdropRequired: false,
    backdropClick: () => {},
    dropdownClasses: ''
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
            <DropdownContent backdropClick={backdropClick} backdropRequired={true} options={options} dropdownClasses={classnames("show", dropdownClasses)}/>}
        </div>
    );
}
