import React, { useEffect, useState } from 'react';
import BilefenImage from '../images/bilefen.jpeg';
import { BsFillBellSlashFill, BsBellFill } from 'react-icons/bs';


const EventBilefenTimer = ({ title }) => {

    const [playAlarm, setPlayAlarm] = useState(false) // true === alarm.play()

    // condition a savoire quelle heure est la plus proche
    // 10:30 AM || 01:30 PM || 4:30 PM ||07:30 PM
    const getRightTime = () => {
        const d = new Date()
        const nowHours = d.getHours();
        const nowMinutes = d.getMinutes();
        // console.log(nowHours)
        // console.log(nowMinutes)
        if(nowHours <= 10) {
            return new Date(`${d.getDate()}/${d.getMonth()+1}/2022 10:30:00`);
        } else if(nowHours >= 11 && nowHours < 14) {
            return new Date(`${d.getDate()}/${d.getMonth()+1}/2022 13:30:00`);
        } else if(nowHours >= 14 && nowHours < 16) {
            return new Date(`${d.getDate()}/${d.getMonth()+1}/2022 16:30:00`);
        } else if(nowHours >= 16 && nowHours < 20) {
            return new Date(`${d.getDate()}/${d.getMonth()+1}/2022 19:30:00`);
        } else if(nowHours >= 20) {
            // console.log(d.getDate())
            // console.log(d)
            d.setDate(d.getDate()+1)
            return `${d.getDate()}/${d.getMonth()+1}/2022 10:30:00`;
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
        // console.log('ici'+new Date(getRightTime()))
        let countDownDate = new Date(getRightTime());
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
                <img className='ashwoldImg' src={BilefenImage}/>
               
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

export default EventBilefenTimer;