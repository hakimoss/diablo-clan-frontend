import React, { useEffect, useState } from 'react';

const ShowReservationPanel = ({ data }) => {

    const [newData, setNewData] = useState([]);

    useEffect(() => {
        // console.log("dans le bon useEffect ")
        // console.log('data',data.data)
        setNewData(data)
    }, [data])

    return(
        <div className='ctnReservationPanel'>
            <p>dungeon : {data.data.dungeon}</p>
            <p>playerNeeded : {data.data.playerNeeded}</p>
            <p>battleTag : {data.data.battleTag}</p>
        </div>
    )
}

export default ShowReservationPanel;