import React, {useState} from 'react';
import Button from '../components/elements/Button';
import PersonalMedia from './PersonalMedia';
import {useDispatch, useSelector} from 'react-redux';
import {setName} from '../redux/actions';
import '../assets/scss/custom/roomEntry.scss';
import {FiCopy, FiShare2} from "react-icons/fi";
import {checkIsMobile} from "./Room/RoomFooter";
import ReactTooltip from "react-tooltip";
// import { useHistory } from "react-router-dom";

const RoomEntry = (props) => {
    const isMobile = checkIsMobile();
    const isRoomOwner = useSelector((state) => state.isRoomOwner);
    const name = useSelector((state) => state.name).trim();
    const dispatch = useDispatch();
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [copyLinkLegend, setCopyLinkLegend] = useState('Copy Link');
    // const acceptEntry = useSelector(state => state.acceptEntry);
    // console.log('name:', name);
    // const history = useHistory();
    const nameInputHandler = (e) => {
        const name = e.target.value.trim();
        if (name !== '') {
            e.target.style.border = '2px solid green';
            dispatch(setName(e.target.value));
            setShowNameWarning(false);
        } else
            setShowNameWarning(true);
    }

    const onMouseOutCopyButton = () => {
        setCopyLinkLegend('Copy Link');
    }

    const copyLinkToClipBoard = async () => {
        const linkToCopy = window.location.href;
        await navigator.clipboard.writeText(linkToCopy);
        setCopyLinkLegend('Link Copied');
    };

    const onShareButtonClick = async () => {
        if (isMobile) {
            const linkToShare = window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: 'Proximo',
                    text: 'Join meeting:',
                    url: linkToShare,
                })
                    .then()
                    .catch((error) => console.log('Error sharing', error));
            } else
                await copyLinkToClipBoard();
        }
        else
            await copyLinkToClipBoard();
    };

    const onJoinButtonClick = () => {
        const nameEle = document.getElementById('input-name');
        let currName = '';
        if (nameEle)
            currName = nameEle.value.trim();
        else
            currName = name;
        if (currName !== '')
            props.createSocket();
        else
            setShowNameWarning(true);
    }
    return (
        <>
            <div className="section room-entry">
                <div className="room-entry-container card has-background-dark">
                    <div className="card-content">
                        <PersonalMedia mediaSuccess={props.mediaSuccess} setMediaSuccess={props.setMediaSuccess}/>
                        {
                            props.acceptEntry === 'R' ?
                                <div className={"waiting-message-area"}>
                                    <h6>Owner doesn't want you in the meeting. Sorry..!</h6>
                                </div> :
                                (
                                    props.acceptEntry === 'F' ?
                                        <div className={"waiting-message-area"}>
                                            <h6>Room is full. Sorry! We currently only allow 4 users at a time per room.</h6>
                                        </div>
                                    :
                                    !props.showWaiting ?
                                    <div className="room-entry-form">
                                        {
                                            props.logged && name !== '' ?
                                                <h4>
                                                    {`Join as ${name}`}
                                                </h4> :
                                                <div className={"input-area"}>
                                                    <label className={"input-label"}
                                                           style={showNameWarning ? {display: 'block'} : {}}>
                                                        Name is required:
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        onChange={nameInputHandler}
                                                        id="input-name"
                                                        placeholder="Name"
                                                        className={"room-entry-input"}
                                                        style={showNameWarning ? {border: '2px solid #f26b4c'} : {}}
                                                    />
                                                </div>
                                        }
                                        <div className={"room-entry-buttons"}>
                                            {
                                                !props.iceSuccess ?
                                                    <div className={"loader-button"}>
                                                        <div className="loader"/>
                                                        <p>Gathering connection requirements.</p>
                                                        <p>Please wait...!</p>
                                                    </div>
                                                    :
                                                    (
                                                        !props.mediaSuccess ?
                                                            <div className={"loader-button"}>
                                                                <p>Please allow camera and mic access to start the meeting.</p>
                                                            </div> :
                                                            <Button color="primary" wide className={"join-button"}
                                                                    disabled={!(props.mediaSuccess && props.iceSuccess)}
                                                                    onClick={onJoinButtonClick}>{isRoomOwner ? 'Start' : 'Join'}</Button>
                                                    )
                                            }
                                            <ReactTooltip id={'room-entry-copy'} place="top" type="dark" effect="solid" className="tooltip">
                                                <span>
                                                    {isMobile ? '' : copyLinkLegend}
                                                </span>
                                            </ReactTooltip>
                                            <button
                                                data-for={'room-entry-copy'}
                                                data-tip
                                                onClick={onShareButtonClick}
                                                disabled={!document.queryCommandSupported('copy')}
                                                className={"share-button"}
                                                onMouseLeave={!isMobile ? onMouseOutCopyButton : null}
                                            >
                                                Share {isMobile ? <FiShare2/> : <FiCopy/>}
                                            </button>
                                        </div>
                                    </div> :
                                    <div className={"waiting-message-area"}>
                                        <div className="loader"/>
                                        {!props.isRoomOwner && props.isRoomLocked ?
                                            <h6>Waiting for room owner to let you in.</h6> :
                                            <h6>Checking room status.</h6>}
                                    </div>)
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default RoomEntry
