import React, { useEffect, useState } from 'react';
import PersonalMedia from './PersonalMedia';

const RoomEntry = React.forwardRef((props, ref) => {
    return (
        <>
            <div className="section">
                <div className="room-entry-container">               
            <PersonalMedia mediaSuccess={props.mediaSuccess} setMediaSuccess={props.setMediaSuccess} ref={ref}></PersonalMedia>
            <button disabled={!(props.mediaSuccess && props.iceSuccess)} onClick={props.createSocket}>Start</button>
            </div>
            </div>
        </>
    )

})

export default RoomEntry