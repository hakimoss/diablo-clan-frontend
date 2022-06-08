import React, { useState } from 'react';
import CreateReservationPanel from '../components/create-reservation-panel';

const Reservation = () => {

    const [isShow, setIsShow] = useState(true);


    const handleShowCreate = () =>{
        console.log('show')
        if(isShow) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            Reservation
         
            {isShow ? (
                <>
                    <button onClick={handleShowCreate}>Create</button>
                    <p>show</p>
                </>
            ) : (
                <>
                    <button onClick={handleShowCreate}>Show</button>
                    <CreateReservationPanel />
                </>
            )}
        </div>
    )
}

export default Reservation;