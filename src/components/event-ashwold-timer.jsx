import React, { useEffect, useState } from 'react';
import './event-ashwold-timer.css';
import AshwoldImage from '../images/ashwold.jpeg';
import { BsFillBellSlashFill, BsBellFill } from 'react-icons/bs';

const EventAshwoldTimer = ({ title }) => {

    const [playAlarm, setPlayAlarm] = useState(false) // true === alarm.play()
    
    const getFirstDayTuesdayOrSaturday = () => {
        const now = new Date()
        //trouver le prochain mardi
        var nextTuesday = new Date();
        nextTuesday.setDate(nextTuesday.getDate() + (((2 + 7 - nextTuesday.getDay()) % 7) || 7));
        
        // trouver le prochain samedi
        var nextSaturay = new Date();
        nextSaturay.setDate(nextSaturay.getDate() + (((6 + 7 - nextSaturay.getDay()) % 7) || 7));


        // console.log('nextTuesday',nextTuesday.getDate())
        // console.log('nextSaturay',nextSaturay.getDate())
        if(now.getHours() >= 12) {
            if(now.getMinutes() > 30) {
                now.setDate(`${now.getDate()+1}/${now.getMonth()}/2022`)
            }
            if(now.getHours() > 12) {
                now.setDate(`${now.getDate()+1}/${now.getMonth()}/2022`)
            }
        }

        if(nextTuesday.getDate() < nextSaturay.getDate() && now.getDay() !== 2 && now.getDay() !== 6) {
            nextTuesday.setHours(12)
            nextTuesday.setMinutes(0)
            nextTuesday.setSeconds(0)
            nextTuesday.setMilliseconds(0)
            return nextTuesday;     
        } else if(nextSaturay.getDate() < nextTuesday.getDate() && now.getDay() !== 2 && now.getDay() !== 6) {
            nextSaturay.setHours(12)
            nextSaturay.setMinutes(0)
            nextSaturay.setSeconds(0)
            nextSaturay.setMilliseconds(0)
            return nextSaturay;
        } else {
            now.setHours(12)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;    
        } 
           
    }

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
        let countDownDate = new Date(getFirstDayTuesdayOrSaturday()).getTime();
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
            <img className='ashwoldImg' src={AshwoldImage}/>
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

export default EventAshwoldTimer;