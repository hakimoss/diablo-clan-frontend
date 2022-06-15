import React, { useEffect, useState } from 'react';
import './reservation-panel.css';
import { firebase } from '../util/firebase';

const db = firebase.database();

const CreateReservationPanel = ({ createReservationToShow, getEmailFromLogin, getProfilFromLogin, setIsShow }) => {

    const [countForShow, setCountForShow] = useState(1)
    const [switchCategories, setSwitchCategories] = useState(0) // 0 ===  dungeon, 1 === rift, 2 === raid

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
            player5: null,
            player6: null,
            player7: null,
            player8: null,
            alarm: false
        });
        setIsShow(true)
    
    }
    
    const RadioValue = () => {
        console.log(switchCategories === 0)
        if (switchCategories === 0) {
            console.log("switch 1")
            return `
                        <option value="Cavern of Echoes">Cavern of Echoes</option>
                        <option value="Destruction's End">Destruction's End</option>
                        <option value="Forgotten Tower">Forgotten Tower</option>
                        <option value="Kikuras Rapids">Kikuras Rapids</option>
                        <option value="Mad King's Breach">Mad King's Breach</option>
                        <option value="Pit of Anguish">Pit of Anguish</option>
                        <option value="Temple of Namari">Temple of Namari</option>
                        <option value="Tomb of Fahir">Tomb of Fahir</option>
                        <option value="Immortal Vault">Immortal Vault</option>
                    `;
        } else if (switchCategories === 1) {
            console.log("switch 2")
            return `
                        <option value="Challenge Rifts">Challenge Rifts</option>
                        <option value="Elder Rifts">Elder Rifts</option>
                    `;
        } else if (switchCategories === 2) {
            console.log("switch 3")
            return `
                        <option value="Lassal Helliquary">Lassal Helliquary</option>
                    `;
        }
      };

      const handleChangeCatefories = (e) => {
          setSwitchCategories(parseInt(e.target.attributes[0].value))
      }



    return(
        <div className='ctnReservationPanel'>

            <div className='ctnRadioInput'>
                <input onClick={e => handleChangeCatefories(e)} categories="0" type="radio" id="dungeonRadio" name="fav_language" value="Dungeon"/>
                <label for="dungeonRadio">Dungeon</label>
                <input onClick={e => handleChangeCatefories(e)} categories="1" type="radio" id="riftRadio" name="fav_language" value="Rift"/>
                <label for="riftRadio">Rift</label>
                <input onClick={e => handleChangeCatefories(e)} categories="2" type="radio" id="raidRadio" name="fav_language" value="Raid"/>
                <label for="raidRadio">Raid</label>
            </div>
            <select name='dungeon' id='dungeon' dangerouslySetInnerHTML={{__html: RadioValue()}} ></select>
            <label htmlFor='nbPlayer'>Joueur déja dans le groupe : </label>
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

