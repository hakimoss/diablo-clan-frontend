import React, { useEffect, useState } from 'react';
import './event-ashwold-timer.css';
import diabloImmortal from '../images/diabloImmortal.jpeg';
import { BsFillBellSlashFill, BsBellFill } from 'react-icons/bs';

const CreateNewTimer = ({ title, getTimeFromCreate }) => {

    const [playAlarm, setPlayAlarm] = useState(false) // true === alarm.play()

    const setAlarm = () =>{
        const timeoutAudio = document.getElementById("timeout_audio");
        timeoutAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
        timeoutAudio.load();

        for (var i=0;i<=3;i++) {
            (function(ind) {
                setTimeout(function(){timeoutAudio.play();}, 100 + (3000 * ind));
            })(i);
        }
        setPlayAlarm(false)
    }

    const calculateTimeLeft = () => {
        let now2 = new Date();
        let countDownDate = new Date(`${now2.getMonth()+1}/${now2.getDate()}/2022 ${getTimeFromCreate}:00`);
        var now = new Date().getTime();
        var distance = countDownDate - now;

        let timeLeft = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        }
        if(playAlarm === true && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes <= 5) {
            setAlarm();
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
            // console.log(timeLeft)
        }, 1000);
        return () => clearTimeout(timer);
    })

    const handleOnOffAlert = () => {
        console.log(playAlarm)
        if(playAlarm) {
            setPlayAlarm(false)
        } else {
            setPlayAlarm(true)
        }
    }

    return(
        <div className='ctnTimerAndTitle'>
            <div className='ctnTitleAlarm'>
                <h2 className='ashwoldTitle'>{title}</h2>
                {playAlarm ? (
                    <span onClick={handleOnOffAlert}><BsBellFill/></span>
                ) : (
                    <span onClick={handleOnOffAlert}><BsFillBellSlashFill/></span>
                )}
            </div>
            <img className='ashwoldImg' src={diabloImmortal}/>
            <p className='ctnDayTime'>{timeLeft.days} JOURS</p>
            <div className='ctnTimerBoss'>
                <div className='ctnTimesBox'>
                    <span className='fontTime'>{timeLeft.hours}</span>
                    <span className='titleTimer'>HEURES</span>
                </div>
                <div className='ctnTimesBox'>
                    <span className='fontTime'>{timeLeft.minutes}</span>
                    <span className='titleTimer'>MINUTES</span>
                </div>
                <div className='ctnTimesBox'>
                    <span className='fontTime'>{timeLeft.seconds}</span>
                    <span className='titleTimer'>SECONDES</span>
                </div>
            </div>
            <audio id="timeout_audio"></audio>
        </div>
    )
}

export default CreateNewTimer;