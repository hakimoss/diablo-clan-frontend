import React, { FunctionComponent, useState } from 'react';
import EventAshwoldTimer from '../components/event-ashwold-timer';
import EventBilefenTimer from '../components/event-bilefen-timer';
import EventRealmOfDamnationTimer from '../components/event-realmOfDamnation-timer';
import EventZavainTimer from '../components/event-zavain-timer';
import './home.css';


const Home = () => {


    return(
        <div>
            <div className='ctnTimerHome'>
                <EventAshwoldTimer title={'Ashwold Cemetery Events'} />
                {/* <EventBilefenTimer title={'Bilefen Event'} /> */}
                <EventZavainTimer title={'Mount Zavain Event'} />
                <EventRealmOfDamnationTimer title={'Realm of Damnation'} />
            </div>
        </div>
    )
}

export default Home;