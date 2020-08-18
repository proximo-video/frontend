import React, {useState} from 'react';
import Button from '../components/elements/Button';
import PersonalMedia from './PersonalMedia';
import {useDispatch, useSelector} from 'react-redux';
import {setName} from '../redux/actions';
import '../assets/scss/custom/roomEntry.scss';
// import { useHistory } from "react-router-dom";

const RoomEntry = (props) => {
    const isRoomOwner = useSelector((state) => state.isRoomOwner);
    const name = useSelector((state) => state.name).trim();
    const dispatch = useDispatch();
    const [showNameWarning, setShowNameWarning] = useState(false);
    // console.log('name:', name);
    // const history = useHistory();
    const nameInputHandler = (e) => {
        const name = e.target.value.trim();
        if (name !== '') {
            e.target.style.border = '2px solid green';
            dispatch(setName(e.target.value));
            setShowNameWarning(false);
        }
        else
            setShowNameWarning(true);
    }
    const onCancelButtonClick = () => {

    }
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
                            !props.showWaiting ?
                            <div className="room-entry-form">
                                {
                                    props.logged && name !== '' ?
                                        <h4>
                                            {`Join as ${name}`}
                                        </h4> :
                                        <div className={"input-area"}>
                                            <label className={"input-label"} style={showNameWarning ? {display: 'block'} : {}}>
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
                                    <Button color="primary" wide className={"join-button"}
                                            disabled={!(props.mediaSuccess && props.iceSuccess)}
                                            onClick={onJoinButtonClick}>{isRoomOwner ? 'Start' : 'Join'}</Button>
                                    <Button color="primary" onClick={onCancelButtonClick} wide className={"cancel-button"}>Cancel</Button>
                                </div>
                                {props.showWaiting && "Waiting"}
                            </div>
                            :
                            <div className={"waiting-message-area"}>
                                <div className="loader"/>
                                <h6>Waiting for room owner to let you in.</h6>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default RoomEntry
