import React, { useEffect, useState } from 'react';
import realmOfDamnation from '../images/realmOfDamnation.jpeg';
import { BsFillBellSlashFill, BsBellFill } from 'react-icons/bs';

const EventRealmOfDamnationTimer = ({ title }) => {

    const [playAlarm, setPlayAlarm] = useState(false) // true === alarm.play()

    //every Monday, Thursay, Sunday at 12pm, 8:30pm, 10pm 
    const getNextMondauThursaySunday = () => {
        const now = new Date();
        // trouver le prochain Lundi
        var nextMonday = new Date();
        nextMonday.setDate(nextMonday.getDate() + (((1 + 7 - nextMonday.getDay()) % 7) || 7));

        //trouver le prochain mardi
        var nextTuesday = new Date();
        nextTuesday.setDate(nextTuesday.getDate() + (((2 + 7 - nextTuesday.getDay()) % 7) || 7));
        
        // trouver le prochain dimanche
        var nextSunday = new Date();
        nextSunday.setDate(nextSunday.getDate() + (((7 + 7 - nextSunday.getDay()) % 7) || 7));

        // if(now.getHours() >= 22) {
           
        //     now.setDate(`${now.getDate()+1}/${now.getMonth()}/2022`)
            
        // }

        // console.log("nextMonday", nextMonday.getDate())
        // console.log("nextTuesday", nextTuesday.getDate())
        // console.log("nextSunday", nextSunday.getDate())

        if(nextMonday.getDate() < nextTuesday.getDate() && nextMonday.getDate() < nextSunday.getDate()) {
            // lundi
            console.log('lundi');
            nextMonday.setHours(12);
            nextMonday.setMinutes(0);
            nextMonday.setSeconds(0);
            nextMonday.setMilliseconds(0);
            return nextMonday;

        } else if(nextTuesday.getDate() < nextMonday.getDate() && nextTuesday.getDate() < nextSunday.getDate()) {
            // mardi
            nextTuesday.setHours(12);
            nextTuesday.setMinutes(0);
            nextTuesday.setSeconds(0);
            nextTuesday.setMilliseconds(0);
            return nextTuesday;

        } else if(nextSunday.getDate() < nextMonday.getDate() && nextSunday.getDate() < nextTuesday.getDate()) {
            // dimanche
            nextSunday.setHours(12);
            nextSunday.setMinutes(0);
            nextSunday.setSeconds(0);
            nextSunday.setMilliseconds(0);
            return nextSunday;
        } else {
            // console.log('ici')
            if(now.getHours() < 12) {
                now.setHours(12);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now
            } else if(now.getHours() < 20 || (now.getHours() === 20 && now.getMinutes() <= 30)) {
                now.setHours(20);
                now.setMinutes(30);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now;
            } else if(now.getHours() < 22) {
                now.setHours(10);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now;
            } else {
                now.setHours(12);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now
            }
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
        let countDownDate = new Date(getNextMondauThursaySunday()).getTime();
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
            <img className='ashwoldImg' src={realmOfDamnation}/>
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
export default EventRealmOfDamnationTimer;
