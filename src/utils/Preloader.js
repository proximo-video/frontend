import React from 'react';
import {FaHeart} from 'react-icons/fa'
const Preloader = () => {
    return (
        <div class="preloader-container">
            <img alt="logo" src="/logo.svg"></img>
            <div>Made with <FaHeart class="icon"/> in India</div>
        </div>
    )
}

export default Preloader;