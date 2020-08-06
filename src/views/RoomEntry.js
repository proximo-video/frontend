import React from 'react';
import Button from '../components/elements/Button';
import PersonalMedia from './PersonalMedia';

const RoomEntry = React.forwardRef((props, ref) => {
    const nameInputHandler = (e)=>{
        props.setName(e.target.value);
    }
    return (
        <>
            <div className="section">
                <div className="room-entry-container card has-background-dark">
                    <div className="card-content">
                        <PersonalMedia mediaSuccess={props.mediaSuccess} setMediaSuccess={props.setMediaSuccess} ref={ref}></PersonalMedia>
                        {props.logged?<></>:<label className="has-text-white"><input onChange={nameInputHandler} placeholder="Name" className="input my-5"></input></label>}
                        <Button color="primary" wide className={props.logged?"my-3":"mb-3"} disabled={!(props.mediaSuccess && props.iceSuccess)} onClick={props.createSocket}>Start</Button>
                    </div>
                </div>
            </div>
        </>
    )

})

export default RoomEntry