import React, { useState, useEffect } from 'react';
import CreateReservationPanel from '../components/create-reservation-panel';
import ShowReservationPanel from '../components/show-reservation-panel';
import { firebase } from '../util/firebase';

const db = firebase.database();

const Reservation = ({ getEmailFromLogin, getProfilFromLogin }) => {

    const [isShow, setIsShow] = useState(true);
    const [showReservationData, setShowReservationData] = useState([]);
    const [refreshDataFromCreate, setRefreshDataFromCreate] = useState(0)

    useEffect(() => {
        const ref = db.ref('reservation')

        ref.on("value", (snapshot) => {
            // setShowReservationData(snapshot.val())
            let record = [];
            snapshot.forEach(childSnapshot =>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val()
                // console.log('data dans le Reservation', data)
                
                if(data !== null) {
                    Object.values(data).map(newData => {
                        // console.log("newData", newData)
                        record.push({"key": keyName, "data": newData})
                    })
                }
            })
            setShowReservationData(record)
        })
        // console.log("showReservationData", showReservationData)
    }, [refreshDataFromCreate])

    const handleShowCreate = () =>{
        if(isShow) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }

    const createReservationToShow = (countRefresh) => {
        // console.log('countRefresh', countRefresh)
        setRefreshDataFromCreate(countRefresh)
    }


    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            Reservation
         
            {isShow ? (
                <>
                    <button onClick={handleShowCreate}>Create</button>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {showReservationData.map((data) => (
                            <ShowReservationPanel getProfilFromLogin={getProfilFromLogin} data={data} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button onClick={handleShowCreate}>Show</button>
                    <CreateReservationPanel getProfilFromLogin={getProfilFromLogin} createReservationToShow={createReservationToShow} getEmailFromLogin={getEmailFromLogin} />
                </>
            )}
        </div>
    )
}

export default Reservation;