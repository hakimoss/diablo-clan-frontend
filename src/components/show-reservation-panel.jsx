import React, { useEffect, useState } from 'react';
import cavernOfEchoes from "../images/cavernOfEchoes.jpeg";
import destructionsEnd from "../images/destructionsEnd.jpeg";
import forgottenTower from "../images/forgottenTower.jpeg";
import kikurasRapids from "../images/kikurasRapids.jpeg";
import madKingsBreach from "../images/madKingsBreach.jpeg";
import pitOfAnguish from "../images/pitOfAnguish.jpeg";
import templeOfNamari from "../images/templeOfNamari.jpeg";
import tombOfFahir from "../images/tombOfFahir.jpeg";
import challengeRifts from "../images/challengeRifts.jpeg";
import elderRifts from "../images/elderRifts.jpeg";
import lassalHelliquary from "../images/lassalHelliquary.jpeg";
import immortalVault from "../images/immortalVault.jpeg";
import { SiBattledotnet } from 'react-icons/si';
import { FiUsers } from 'react-icons/fi';
import { firebase } from '../util/firebase';
import { BsFillBellSlashFill, BsBellFill } from 'react-icons/bs';


const db = firebase.database();

const ShowReservationPanel = ({ data, getProfilFromLogin }) => {

    const [newData, setNewData] = useState([]);
    const [image, setImage] = useState();
    const [imageAlt, setImageAlt] = useState();
    const [msgError, setMsgError] = useState("")
    const [maxPlayer, setMaxPlayer] = useState(4);

    const [isShowJoinButton, setIsShowJoinButton] = useState(true) // true === he can join

    useEffect(() => {
        setNewData(data)
        //TODO: ajout les image
    
        switch(data.data.dungeon) {
            case "Cavern of Echoes":
                setImage(cavernOfEchoes);
                setImageAlt("Cavern of Echoes");
                setMaxPlayer(4);
                break;
            case "Destruction's End":
                setImage(destructionsEnd);
                setImageAlt("Destruction's End");
                setMaxPlayer(4);
                break;
            case "Forgotten Tower":
                setImage(forgottenTower);
                setImageAlt("Forgotten Tower");
                setMaxPlayer(4);
                break;
            case "Kikuras Rapids":
                setImage(kikurasRapids);
                setImageAlt("Kikuras Rapids");
                setMaxPlayer(4);
                break;
            case "Mad King's Breach":
                setImage(madKingsBreach);
                setImageAlt("Mad King's Breach");
                setMaxPlayer(4);
                break;
            case "Pit of Anguish":
                setImage(pitOfAnguish);
                setImageAlt("Pit of Anguish");
                setMaxPlayer(4);
                break;
            case "Temple of Namari":
                setImage(templeOfNamari);
                setImageAlt("Temple of Namari");
                setMaxPlayer(4);
                break;
            case "Tomb of Fahir":
                setImage(tombOfFahir);
                setImageAlt("Tomb of Fahir");
                setMaxPlayer(4);
                break;
            case "Challenge Rifts":
                setImage(challengeRifts);
                setImageAlt("Challenge Rifts");
                setMaxPlayer(4);
                break;
            case "Elder Rifts":
                setImage(elderRifts);
                setImageAlt("Elder Rifts");
                setMaxPlayer(4);
                break;
            case "Lassal Helliquary":
                setImage(lassalHelliquary);
                setImageAlt("Lassal Helliquary");
                setMaxPlayer(8);
                break;
            case "Immortal Vault":
                setImage(immortalVault);
                setImageAlt("Immortal Vault");
                setMaxPlayer(8);
                break;  
        }
    }, [data])

    const handleJoinRoom = (e) => {

        if(parseInt(e.target.parentElement.children[4].children[1].firstChild.textContent) >= maxPlayer) {
            setMsgError("Aucune place disponible")
            setTimeout(() => { setMsgError("") }, 2000);
            return;
        }

        let nbPlayer = parseInt(e.target.parentElement.children[4].children[1].firstChild.textContent) + 1
        
        const reservationRef = db.ref(`reservation/${data.data.email}/${data.data.uid}`);
        
        console.log(e.target.parentElement.children[5].innerHTML)
        
        if(e.target.parentElement.children[6].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player2': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if (e.target.parentElement.children[7].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player3': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if(e.target.parentElement.children[8].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[6].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player4': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if(maxPlayer === 8 && e.target.parentElement.children[9].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[6].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[7].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player5': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if(maxPlayer === 8 && e.target.parentElement.children[10].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[6].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[7].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[8].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player6': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if(maxPlayer === 8 && e.target.parentElement.children[11].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[6].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[7].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[8].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[9].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player7': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } else if(maxPlayer === 8 && e.target.parentElement.children[12].innerHTML === "" && e.target.parentElement.children[5].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[6].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[7].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[8].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[9].innerHTML !== getProfilFromLogin[4] && e.target.parentElement.children[10].innerHTML !== getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player8': getProfilFromLogin[4],
                'alarm': true
            })
            setIsShowJoinButton(false)
        } 
    }

    const handleDeleteRoom = () => {
        const reservationRef = db.ref(`reservation/${data.data.email}/${data.data.uid}`);
        reservationRef.remove()
    }


    const handleLeaveRoom = (e) => {
        console.log(e.target.parentElement.children[5].innerHTML)
        // e.target.parentElement.children[5].innerHTML == 2ieme place
        let nbPlayer = parseInt(e.target.parentElement.children[4].children[1].firstChild.textContent) -1
        const reservationRef = db.ref(`reservation/${data.data.email}/${data.data.uid}`);
        if(e.target.parentElement.children[6].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player2': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[7].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player3': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[8].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player4': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[9].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player5': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[10].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player6': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[11].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player7': null,
                'alarm': true
            })
            setIsShowJoinButton(true)
        } else if(e.target.parentElement.children[12].innerHTML === getProfilFromLogin[4]) {
            reservationRef.update({
                'playerNeeded': nbPlayer,
                'player8': null,
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
            <span className='iconUnmuteShowReservaton'><BsBellFill /></span>
            <div className='ctnMakerReservation'>
                <SiBattledotnet className='iconBattleNetReservation' /> 
                <span className='makerNameReservation'>{data.data.battleTag}</span>
            </div>
            <img src={image} alt={imageAlt} />
            <div className='ctnProfilInRoom'>
                <FiUsers />
                <span>{data.data.playerNeeded}/{maxPlayer}</span>
            </div>
            <span className='joinedPlayerName'>{data.data.player1}</span>
            <span className='joinedPlayerName'>{data.data.player2}</span>
            <span className='joinedPlayerName'>{data.data.player3}</span>
            <span className='joinedPlayerName'>{data.data.player4}</span>
            <span className='joinedPlayerName'>{data.data.player5}</span>
            <span className='joinedPlayerName'>{data.data.player6}</span>
            <span className='joinedPlayerName'>{data.data.player7}</span>
            <span className='joinedPlayerName'>{data.data.player8}</span>

            <p style={{ color: "red", textAlign: 'center'}}>{msgError}</p>
            
            {getProfilFromLogin[4] === data.data.battleTag ? (
                <button onClick={handleDeleteRoom}>Delete</button>
            ) : (
                <>
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