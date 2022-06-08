import React from 'react';
import './reservation-panel.css';

const CreateReservationPanel = () => {

    

    return(
        <div className='ctnReservationPanel'>
            Reservation Panel
            <label for='dungeon'>Choisi le raid/dungeon/faille : </label>
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
            <label for='nbPlayer'>Combien de joueur etes vous : </label>
            <select name='nbPlayer' id='nbPlayer'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
            </select>
        </div>
    )
}

export default CreateReservationPanel;