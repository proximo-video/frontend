import React from 'react';
import {FaHeart} from 'react-icons/fa'
const Preloader = () => {
    return (
        <div class="preloader-container">
            <img alt="logo" src="/logo-preloader.svg"></img>
            <div><h6>Made with <FaHeart class="icon"/> in India</h6></div>
        </div>
    )
}

export default Preloader;