import React, { useState, useEffect } from 'react';
import CreateReservationPanel from '../components/create-reservation-panel';
import ShowReservationPanel from '../components/show-reservation-panel';
import { firebase } from '../util/firebase';

const db = firebase.database();

const Reservation = ({ getEmailFromLogin, getProfilFromLogin, signalFromReservation }) => {

    const [isShow, setIsShow] = useState(true);
    const [showReservationData, setShowReservationData] = useState([]);
    const [refreshDataFromCreate, setRefreshDataFromCreate] = useState(0)
    const [countSignal, setCountSignal] = useState(0);

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

    //envoi de signal a la nav pour dire qu'une reservation est fait
    useEffect(() => {
        signalFromReservation(countSignal)
        setCountSignal(countSignal+1)
    }, [showReservationData.length])

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '210px    '}}>
            {/* Reservation */}
         
            {isShow ? (
                <>
                    <p>Pour crée une réservation de raid/dungeon/rift <span className='linkCreateReservation' onClick={handleShowCreate}>cliquer ici</span></p>
                    {showReservationData.length === 0 ? (
                        <>
                            <p style={{ marginTop: '20vh', fontSize: '1.5em', fontWeight: '600'}}>Il n'y a pas de réservation pour le moment</p>
                        </>
                    ) : (
                        <>
                            {/* <button onClick={handleShowCreate}>Create</button> */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                                {showReservationData.map((data) => (
                                    <ShowReservationPanel getProfilFromLogin={getProfilFromLogin} data={data} />
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <button onClick={handleShowCreate}>Show</button>
                    <CreateReservationPanel setIsShow={setIsShow} getProfilFromLogin={getProfilFromLogin} createReservationToShow={createReservationToShow} getEmailFromLogin={getEmailFromLogin} />
                </>
            )}
        </div>
    )
}

export default Reservation;