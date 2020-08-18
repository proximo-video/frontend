import React from 'react';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input'
import PersonalMedia from './PersonalMedia';
import {useDispatch, useSelector} from 'react-redux';
import {setName} from '../redux/actions';
import '../assets/scss/custom/roomEntry.scss';
import { useHistory } from "react-router-dom";

const RoomEntry = (props) => {
    const isRoomOwner = useSelector((state) => state.isRoomOwner);
    const dispatch = useDispatch();
    const history = useHistory();
    const nameInputHandler = (e) => {
        dispatch(setName(e.target.value));
    }
    const onCancelButtonClick = () => {

    }
    return (
        <>
            <div className="section room-entry">
                <div className="room-entry-container card has-background-dark">
                    <div className="card-content">
                        <PersonalMedia mediaSuccess={props.mediaSuccess} setMediaSuccess={props.setMediaSuccess}/>
                        <div className="room-entry-form">
                            {props.logged ? <></> : <input type="text" onChange={nameInputHandler} placeholder="Name" className={"room-entry-input"}/>}
                            <div className={"room-entry-buttons"}>
                                <Button color="primary" wide className={"join-button"}
                                        disabled={!(props.mediaSuccess && props.iceSuccess)}
                                        onClick={props.createSocket}>{isRoomOwner ? 'Start' : 'Join'}</Button>
                                <Button color="primary" wide className={"cancel-button"}
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
