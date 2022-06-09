import React, { useEffect, useState } from 'react';
import cavernOfEchoes from "../images/cavernOfEchoes.jpeg";
import destructionsEnd from "../images/destructionsEnd.jpeg";
import forgottenTower from "../images/forgottenTower.jpeg";
import kikurasRapids from "../images/kikurasRapids.jpeg";
import madKingsBreach from "../images/madKingsBreach.jpeg";
import pitOfAnguish from "../images/pitOfAnguish.jpeg";
import templeOfNamari from "../images/templeOfNamari.jpeg";
import tombOfFahir from "../images/tombOfFahir.jpeg";
import { SiBattledotnet } from 'react-icons/si';
import { FiUsers } from 'react-icons/fi';
import { firebase } from '../util/firebase';

const db = firebase.database();


const ShowReservationPanel = ({ data, getProfilFromLogin }) => {

    const [newData, setNewData] = useState([]);
    const [image, setImage] = useState();
    const [imageAlt, setImageAlt] = useState();
    const [msgError, setMsgError] = useState("")

    const [isShowJoinButton, setIsShowJoinButton] = useState(true) // true === he can join

    useEffect(() => {
        setNewData(data)
        //TODO: ajout les image
    
        switch(data.data.dungeon) {
            case "Cavern of Echoes":
                setImage(cavernOfEchoes);
                setImageAlt("Cavern of Echoes");
                break;
            case "Destruction's End":
                setImage(destructionsEnd);
                setImageAlt("Destruction's End");
                break;
            case "Forgotten Tower":
                setImage(forgottenTower);
                setImageAlt("Forgotten Tower");
                break;
            case "Kikuras Rapids":
                setImage(kikurasRapids);
                setImageAlt("Kikuras Rapids");
                break;
            case "Mad King's Breach":
                setImage(madKingsBreach);
                setImageAlt("Mad King's Breach");
                break;
            case "Pit of Anguish":
                setImage(pitOfAnguish);
                setImageAlt("Pit of Anguish");
                break;
            case "Temple of Namari":
                setImage(templeOfNamari);
                setImageAlt("Temple of Namari");
                break;
            case "Tomb of Fahir":
                setImage(tombOfFahir);
                setImageAlt("Tomb of Fahir");
                break;
            
        }
    }, [data])

    const handleJoinRoom = (e) => {
        let nbPlayer = parseInt(e.target.parentElement.children[3].children[1].firstChild.textContent) + 1
        
        console.log(data.data)
        const reservationRef = db.ref(`reservation/${data.data.email}/${data.data.uid}`);
        
        
        if(e.target.parentElement.children[5].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4]) {
            console.log(e.target.parentElement.children[5].innerHTML)
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player2': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if (e.target.parentElement.children[6].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player3': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if(e.target.parentElement.children[7].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[6].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player4': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else {
            setMsgError("Aucune place disponible")
            setTimeout(() => { setMsgError("") }, 2000);
        }
    }

    const handleDeleteRoom = () => {
        const reservationRef = db.ref(`reservation/${data.data.email}/${data.data.uid}`);
        reservationRef.remove()
    }


    const handleLeaveRoom = (e) => {
        console.log(e)
        // e.target.parentElement.children[5].innerHTML == 2ieme place
        let nbPlayer = parseInt(e.target.parentElement.children[3].children[1].firstChild.textContent) -1
        const reservationRef = db.ref(`reservation/${data.data.email}/${data.data.uid}`);
        if(e.target.parentElement.children[5].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player2': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[6].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player3': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[7].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player4': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        }
    }
   

    useEffect(() => {
        console.log(data.data)
        if(data.data.alarm === true && data.data.battleTag === getProfilFromLogin[4]) {
            const timeoutAudio = document.getElementById("timeout_audio");
            timeoutAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
            let x =0;
            let myTimer = () => {
                timeoutAudio.load();
                timeoutAudio.play();
                x = x + 1;
                console.log(x)
                if(x === 3) {
                    clearInterval(myInterval)
                }
            }
            const myInterval = setInterval(myTimer, 400);
            const reservationRef = db.ref(`reservation/${data.data.email}/${data.data.uid}`);
            reservationRef.update({
                'alarm': false
            })
        }
    }, [data])

    return(
        <div className='ctnShowReservationPanel'>
            <span className='dungeonTitleShowPanel'>{data.data.dungeon}</span>
            <div className='ctnMakerReservation'>
                <SiBattledotnet className='iconBattleNetReservation' /> 
                <span className='makerNameReservation'>{data.data.battleTag}</span>
            </div>
            <img src={image} alt={imageAlt} />
            <div className='ctnProfilInRoom'>
                <FiUsers />
                <span>{data.data.playerNeeded}/4</span>
            </div>

            <span className='joinedPlayerName'>{data.data.player1}</span>
            <span className='joinedPlayerName'>{data.data.player2}</span>
            <span className='joinedPlayerName'>{data.data.player3}</span>
            <span className='joinedPlayerName'>{data.data.player4}</span>

            <p style={{ color: "red", textAlign: 'center'}}>{msgError}</p>
            
            {getProfilFromLogin[4] === data.data.battleTag ? (
                <button onClick={handleDeleteRoom}>Delete</button>
            ) : (
                <>
                    {/* {getProfilFromLogin[4] === data.data.player2 || data.data.player3 || data.data.player4 ? (
                        <button onClick={e => handleLeaveRoom(e)}>Leave</button>
                    ) : (
                        <button onClick={e => handleJoinRoom(e)}>Join</button>
                    )} */}
                    {isShowJoinButton ? (
                        <button onClick={e => handleJoinRoom(e)}>Join</button>
                    ) : (
                        <button onClick={e => handleLeaveRoom(e)}>Leave</button>
                    )}
                </>
                
            )}

            <audio id="timeout_audio"></audio>

        </div>
    )
}

export default ShowReservationPanel;