import React from 'react';
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
    // console.log('name:', name);
    // const history = useHistory();
    const nameInputHandler = (e) => {
        const name = e.target.value.trim();
        if (name !== '')
            dispatch(setName(e.target.value));
    }
    const onCancelButtonClick = () => {

    }
    const onJoinButtonClick = () => {
        const name = document.getElementById('input-name').value.trim();
        if (name !== '')
            props.createSocket();
        else
            console.log('empty name not allowed');
    }
    return (
        <>
            <div className="section room-entry">
                <div className="room-entry-container card has-background-dark">
                    <div className="card-content">
                        <PersonalMedia mediaSuccess={props.mediaSuccess} setMediaSuccess={props.setMediaSuccess}/>
                        <div className="room-entry-form">
                            {props.logged && name !== '' ? <></> : <input required type="text" onChange={nameInputHandler} id="input-name" placeholder="Name" className={"room-entry-input"}/>}
                            <div className={"room-entry-buttons"}>
                                <Button color="primary" wide className={"join-button"}
                                        disabled={!(props.mediaSuccess && props.iceSuccess)}
                                        onClick={props.createSocket}>{isRoomOwner ? 'Start' : 'Join'}</Button>
                                <Button color="primary" onClick={onCancelButtonClick} wide className={"cancel-button"}
                                        onClick={null}>Cancel</Button>
                            </div>
                            {props.showWaiting && "Waiting"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default RoomEntry
