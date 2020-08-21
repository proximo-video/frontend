import React from "react";
import {FaGlobeAmericas, FaLinkedinIn, GoMarkGithub} from "react-icons/all";


export interface AboutUs {

}

export default function AboutUs() {
    return (
        <div className={"about-us-container"}>
            <h1 className={"about-us-h1"}>Team</h1>
            <div className={"about-us-details"}>
                <div id={"about-us-single1"} className={"about-us-single"}>
                    <div className={"avatar-container"}/>
                    <div className={"about-me"}>
                        <h6>Rishabh Tripathi</h6>
                        <p>Hi! I am Rishabh. I am a developer, traveler, and an occasional adventure seeker. I hope you loved this website. Feel free to check out my profiles :).</p>
                        <div className={"urls"}>
                            <a href={"https://www.linkedin.com/in/ristri/"}><FaLinkedinIn/></a>
                            <a href={"https://github.com/ristri"}><GoMarkGithub/></a>
                            {/*eslint-disable-next-line*/}
                            <a href={"#"}><FaGlobeAmericas/></a>
                        </div>
                    </div>
                    <div className={"avatar-background"}/>
                </div>
                <div id={"about-us-single2"} className={"about-us-single"}>
                    <div className={"avatar-container"}/>
                    <div className={"about-me"}>
                        <h6>Aniket Singh</h6>
                        <p>Hi! I am Aniket. I am a developer, traveler, and an occasional adventure seeker. I hope you loved this website. Feel free to check out my profiles :).</p>
                        <div className={"urls"}>
                            <a href={"https://www.linkedin.com/in/aniketsingh0104/"}><FaLinkedinIn/></a>
                            <a href={"https://github.com/aniketsingh0104"}><GoMarkGithub/></a>
                            {/*eslint-disable-next-line*/}
                            <a href={"#"}><FaGlobeAmericas/></a>
                        </div>
                    </div>
                    <div className={"avatar-background"}>
                        {/*<h6>Hi! I am </h6>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}