import React, { useEffect, useState } from 'react';
import ZavainImage from '../images/zavain.jpeg';
import { BsFillBellSlashFill, BsBellFill } from 'react-icons/bs';


const EventZavainTimer = ({ title }) => {

    const [playAlarm, setPlayAlarm] = useState(false) // true === alarm.play()

    // every Wednesday and Friday at 12pm, 8:30pm and 10pm 
    // 8:00 AM, 10:00 AM, 12:00 PM, 2:00 PM, 4:00 PM 06:00 PM, 8:00 PM, 10:00 PM, 12:00 AM
    const getNextWednesdayOrFriday = () => {

        let now = new Date();

        var nextWednesday = new Date();
        nextWednesday.setDate(nextWednesday.getDate() + (((3 + 7 - nextWednesday.getDay()) % 7) || 7));

        var nextFriday = new Date();
        nextFriday.setDate(nextFriday.getDate() + (((5 + 7 - nextFriday.getDay()) % 7) || 7));

        // console.log("nextWednesday", nextWednesday.getDate())
        // console.log("nextFriday", nextFriday.getDate())

        if(nextWednesday.getDate() < nextFriday.getDate()) {
            // console.log("mercredi")
            nextWednesday.setHours(12);
            nextWednesday.setMinutes(0);
            nextWednesday.setSeconds(0);
            nextWednesday.setMilliseconds(0);
            // console.log(nextWednesday)
            return nextWednesday;
        } else if(nextFriday.getDate() < nextWednesday.getDate()) {
            nextFriday.setHours(12);
            nextFriday.setMinutes(0);
            nextFriday.setSeconds(0);
            nextFriday.setMilliseconds(0);
            return nextFriday;
        } else {
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
        let d = new Date()
        // console.log(getRightTime())
        // console.log(d.getMonth())
        let countDownDate = new Date(getNextWednesdayOrFriday()).getTime();
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
        // console.log(playAlarm)
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
            </div>
            <audio id="timeout_audio"></audio>
        </div>
    )
}

export default EventZavainTimer;