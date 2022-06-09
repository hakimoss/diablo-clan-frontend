import React, { useEffect, useState } from 'react';
import './reservation-panel.css';
import { firebase } from '../util/firebase';

const db = firebase.database();

const CreateReservationPanel = ({ createReservationToShow, getEmailFromLogin, getProfilFromLogin }) => {

    const [userUid, setUserUid] = useState('')
    const [countForShow, setCountForShow] = useState(1)

    useEffect(() => {
        window.addEventListener("beforeunload", function () {
            db.ref(`reservation/${getEmailFromLogin}`).remove();
        })
    })
    
    const handleSubmitReservation = () => {
        const dungeon = document.querySelector("#dungeon").value
        const playerNeeded = document.querySelector("#nbPlayer").value
        console.log(getProfilFromLogin[4])

        const reservationRef = db.ref(`reservation/${getEmailFromLogin}`);
        const newReservationRef = reservationRef.push();
        setUserUid(newReservationRef.key)
        db.ref(`reservation/${getEmailFromLogin}`).remove();
        setCountForShow(countForShow + 1)
        createReservationToShow(countForShow)
        newReservationRef.set({
            dungeon: dungeon,
            playerNeeded: playerNeeded,
            user: getEmailFromLogin,
            battleTag: getProfilFromLogin[4],
            uid: newReservationRef.key,
            email: getEmailFromLogin,
            player1: getProfilFromLogin[4],
            player2: null,
            player3: null,
            player4: null,
            alarm: false
        });
        //TODO: retourner l'utilisateur au visuel des reservation
        
    
    }

    return(
        <div className='ctnReservationPanel'>
            Reservation Panel
            <label htmlFor='dungeon'>Choisi le raid/dungeon/faille : </label>
            <select name='dungeon' id='dungeon'>
                <option value="Cavern of Echoes">Cavern of Echoes</option>
                <option value="Destruction's End">Destruction's End</option>
                <option value="Forgotten Tower">Forgotten Tower</option>
                <option value="Kikuras Rapids">Kikuras Rapids</option>
                <option value="Mad King's Breach">Mad King's Breach</option>
                <option value="Pit of Anguish">Pit of Anguish</option>
                <option value="Temple of Namari">Temple of Namari</option>
                <option value="Tomb of Fahir">Tomb of Fahir</option>
            </select>
            <label htmlFor='nbPlayer'>Combien de avez vous besoin : </label>
            <select name='nbPlayer' id='nbPlayer'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
            </select>

            <button onClick={handleSubmitReservation}>Create</button>
        </div>
    )
}

export default CreateReservationPanel;