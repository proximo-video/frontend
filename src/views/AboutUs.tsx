import React from "react";
import { FaGlobeAmericas, FaLinkedinIn, GoMarkGithub } from "react-icons/all";

export interface AboutUsInnerProps {
    className: string;
    heading: string;
    headingType: 1 | 2 | 3;
}

export function AboutUsInner(props: AboutUsInnerProps) {
    return (
        <div className={props.className}>
            {
                props.headingType === 1 ?
                    <h1 className={"about-us-h1"}>{props.heading}</h1> :
                    (
                        props.headingType === 2 ?
                            <h2 className={"about-us-h1"}>{props.heading}</h2> :
                            <h3 className={"about-us-h1"}>{props.heading}</h3>
                    )
            }
            <div className={"about-us-details"}>
                <div id={"about-us-single1"} className={"about-us-single"}>
                    <div className={"avatar-and-details"}>
                        <div className={"avatar-container"}>
                            <img src={"images/tripathi_avatar2.png"} alt={"avatar"} />
                        </div>
                        <div className={"about-me"}>
                            <h6>Rishabh Tripathi</h6>
                            <p>Hi! I am Rishabh. I am a developer, dreamer, and an adventure seeker. I love
                               working on challenging problems. Let's be friends.</p>
                            <div className={"urls"}>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://www.linkedin.com/in/ristri/"}><FaLinkedinIn /></a>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://github.com/ristri"}><GoMarkGithub /></a>
                                {/*eslint-disable-next-line*/}
                                <a rel="noopener noreferrer" target={"_blank"} href='https://tripathi.dev'><FaGlobeAmericas /></a>
                            </div>
                        </div>
                    </div>
                    <div className={"avatar-background"}>
                        <div className={"avatar-container"} style={{ visibility: "hidden" }}>
                            <img src={"images/tripathi_avatar2.png"} alt={"avatar"} />
                        </div>
                        <div className={"about-me"} style={{ visibility: "hidden" }}>
                            <h6>Rishabh Tripathi</h6>
                            <p> Hi! I am Rishabh. I am a developer, dreamer, and an adventure seeker. I love
                               working on challenging problems. Let's be friends.</p>
                            <div className={"urls"}>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://www.linkedin.com/in/ristri/"}><FaLinkedinIn /></a>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://github.com/ristri"}><GoMarkGithub /></a>
                                {/*eslint-disable-next-line*/}
                                <a rel="noopener noreferrer" target={"_blank"} href='https://tripathi.dev'><FaGlobeAmericas /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={"about-us-single2"} className={"about-us-single"}>
                    <div className={"avatar-and-details"}>
                        <div className={"avatar-container"}>
                            <img src={"images/aniket_avatar2.png"} alt={"avatar"} />
                        </div>
                        <div className={"about-me"}>
                            <h6>Aniket Singh</h6>
                            <p>Hi! I am Aniket. I am a developer, traveler, and an adventure seeker. I hope
                                you loved this website. Feel free to check out my profiles :).</p>
                            <div className={"urls"}>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://www.linkedin.com/in/aniketsingh0104/"}><FaLinkedinIn /></a>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://github.com/aniketsingh0104"}><GoMarkGithub /></a>
                                {/*eslint-disable-next-line*/}
                                <a rel="noopener noreferrer" target={"_blank"} href={"#"}><FaGlobeAmericas /></a>
                            </div>
                        </div>
                    </div>
                    <div className={"avatar-background"}>
                        <div className={"avatar-container"} style={{ visibility: "hidden" }}>
                            <img src={"images/aniket_avatar2.png"} alt={"avatar"} />
                        </div>
                        <div className={"about-me"} style={{ visibility: "hidden" }}>
                            <h6>Aniket Singh</h6>
                            <p>Hi! I am Aniket. I am a developer, traveler, and an adventure seeker. I hope
                                you loved this website. Feel free to check out my profiles :).</p>
                            <div className={"urls"}>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://www.linkedin.com/in/aniketsingh0104/"}><FaLinkedinIn /></a>
                                <a rel="noopener noreferrer" target={"_blank"} href={"https://github.com/aniketsingh0104"}><GoMarkGithub /></a>
                                {/*eslint-disable-next-line*/}
                                <a rel="noopener noreferrer" target={"_blank"} href={"#"}><FaGlobeAmericas /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AboutUsInner.defaultProps = {
    className: '',
    heading: 'Team',
    headingType: 1,
}


export interface AboutUs {

}

export default function AboutUs() {
    return (
        <div className={"about-us-container"}>
            <AboutUsInner />
        </div>
    );
}