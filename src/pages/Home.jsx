import React, { FunctionComponent, useState } from 'react';
import CreateNewTimer from '../components/create-new-timer';
import EventAshwoldTimer from '../components/event-ashwold-timer';
import EventBilefenTimer from '../components/event-bilefen-timer';
import EventRealmOfDamnationTimer from '../components/event-realmOfDamnation-timer';
import EventZavainTimer from '../components/event-zavain-timer';
import './home.css';


const Home = () => {

    const [isCreateTimer, setIsCreateTimer] = useState(false) // true === createTimer screen
    const [createTimerData, setCreateTimerData] = useState({})
    const [isShowNewTimer, setIsShowNewTimer] = useState(false); // true === show new Timer created
    

    const handleCreateTimerView = () => {
        setIsCreateTimer(true);
    }

    const handleShowTimer = () => {
        setIsCreateTimer(false);
    }

    const handleCreateTimer = (e) => {

        setCreateTimerData({
            title: e.target.parentElement.children[1].value,
            time: e.target.parentElement.children[3].value
        })
        setIsCreateTimer(false);
        setIsShowNewTimer(true);
    }

    return(
        <div>
            <div>
            
                {isCreateTimer ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{ textAlign: 'center', marginTop: '2%'}}>Pour retourner voir les timer <span className='linkCreateReservation' onClick={handleShowTimer}>cliquer ici</span></p>
                        <div className='ctnCreateTimer'>
                            <label for='inputTitleTimer'>Inserer le titre du timer : </label>
                            <input id='inputTitleTimer' type='text'/>
                            <label for='inputTimerPicker'>L'évenement aura lieu à : </label>
                            <input id='inputTimerPicker' type='time'/>
                            <button onClick={e => handleCreateTimer(e)}>Create</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p style={{ textAlign: 'center', marginTop: '2%'}}>Pour crée un timer personnalisé <span className='linkCreateReservation' onClick={handleCreateTimerView}>cliquer ici</span></p>
                        <div className='ctnTimerHome'>
                            {isShowNewTimer ? (
                                <>
                                    <CreateNewTimer title={createTimerData.title} getTimeFromCreate={createTimerData.time} />
                                    <EventAshwoldTimer title={'Ashwold Cemetery Events'} />
                                    {/* <EventBilefenTimer title={'Bilefen Event'} /> */}
                                    <EventZavainTimer title={'Mount Zavain Event'} />
                                    <EventRealmOfDamnationTimer title={'Realm of Damnation'} />
                                </>
                            ) : (
                                <>
                                    <EventAshwoldTimer title={'Ashwold Cemetery Events'} />
                                    {/* <EventBilefenTimer title={'Bilefen Event'} /> */}
                                    <EventZavainTimer title={'Mount Zavain Event'} />
                                    <EventRealmOfDamnationTimer title={'Realm of Damnation'} />
                                </>
                            )}
                            
                        </div>
                    </>
                )}     
            </div>
        </div>
    )
}

export default Home;