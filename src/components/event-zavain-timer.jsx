import React, { useEffect, useState } from 'react';
import ZavainImage from '../images/zavain.jpeg';
import { BsFillBellSlashFill, BsBellFill } from 'react-icons/bs';


const EventZavainTimer = ({ title }) => {

    const [playAlarm, setPlayAlarm] = useState(false) // true === alarm.play()


    // 8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM, 4:00 PM 06:00 PM, 8:00 PM, 10:00 PM, 12:00 AM
    const getRightTime = () => {
        let now = new Date()
        if(now.getHours() < 8) {
            now.setHours(8)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 8 && now.getHours() < 10) {
            now.setHours(10)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 10 && now.getHours() < 12) {
            now.setHours(12)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 12 && now.getHours() < 14) {
            now.setHours(14)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 14 && now.getHours() < 16) {
            now.setHours(16)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 16 && now.getHours() < 18) {
            now.setHours(18)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 18 && now.getHours() < 20) {
            now.setHours(20)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 20 && now.getHours() < 22) {
            now.setHours(22)
            now.setMinutes(0)
            now.setSeconds(0)
            now.setMilliseconds(0)
            return now;
        } else if(now.getHours() >= 22 && now.getHours() < 24) {
            now.setHours(24)
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
        let d = new Date()
        // console.log(getRightTime())
        // console.log(d.getMonth())
        let countDownDate = new Date(getRightTime()).getTime();
        // console.log(countDownDate)
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
        <div>
            <div className='ctnTimerAndTitle'>
                <div className='ctnTitleAlarm'>
                    <h2 className='ashwoldTitle'>{title}</h2>
                    {playAlarm ? (
                        <span onClick={handleOnOffAlert}><BsBellFill/></span>
                    ) : (
                        <span onClick={handleOnOffAlert}><BsFillBellSlashFill/></span>
                    )}
                </div>
                <img className='ashwoldImg' src={ZavainImage}/>
                <div className='ctnTimerBoss ctnTimerBossBilefen'>
                    <div className='ctnTimesBox'>
                        <span>{timeLeft.hours}</span>
                        <span className='titleTimer'>HEURES</span>
                    </div>
                    <div className='ctnTimesBox'>
                        <span>{timeLeft.minutes}</span>
                        <span className='titleTimer'>MINUTES</span>
                    </div>
                    <div className='ctnTimesBox'>
                        <span>{timeLeft.seconds}</span>
                        <span className='titleTimer'>SECONDES</span>
                    </div>

                </div>
            </div>
            <audio id="timeout_audio"></audio>
        </div>
    )
}

export default EventZavainTimer;