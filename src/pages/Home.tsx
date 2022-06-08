import React, { FunctionComponent, useState } from 'react';
import EventAshwoldTimer from '../components/event-ashwold-timer';
import EventBilefenTimer from '../components/event-bilefen-timer';
import EventZavainTimer from '../components/event-zavain-timer';
import './home.css';


const Home: FunctionComponent = () => {


    return(
        <div>
            <div className='ctnTimerHome'>
                <EventAshwoldTimer title={'Ashwold Cemetery Events'} />
                <EventBilefenTimer title={'Bilefen Event'} />
                <EventZavainTimer title={'Mount Zavain Event'} />
            </div>
        </div>
    )
}

export default Home;