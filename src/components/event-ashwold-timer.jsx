import React, { useEffect, useState } from 'react';
import './event-ashwold-timer.css';
import AshwoldImage from '../images/ashwold.jpeg';



const EventAshwoldTimer = ({ title }) => {
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
        <div className='ctnTimerAndTitle'>
            
            <h2 className='ashwoldTitle'>{title}</h2>
            <img className='ashwoldImg' src={AshwoldImage}/>
            <p className='ctnDayTime'>{timeLeft.days} JOURS</p>
            <div className='ctnTimerBoss'>
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
    )
}

export default EventAshwoldTimer;