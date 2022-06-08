import React, { useEffect, useState } from 'react';
import BilefenImage from '../images/bilefen.jpeg';


const EventBilefenTimer = ({ title }) => {


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

    return(
        <div>
            <div className='ctnTimerAndTitle'>
                <h2 className='ashwoldTitle'>{title}</h2>
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
        </div>
    )
}

export default EventBilefenTimer;