import React, { useEffect } from 'react';
import './navigation.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/logox512.png';


const Navigation = ({ getProfilFromLogin, signalFromReservation }) => {

    // useEffect(() => {
    //     const pointSignal = document.querySelector('.pointSignal').style
    //     console.log(pointSignal.display)
    //     console.log(signalFromReservation)
    //     if(signalFromReservation !== 0) {
    //         pointSignal.display = 'block'
    //     }
    // }, [signalFromReservation])

    return(
        <div className='ctnNavigation'>
            <img className='weedQc' src={logo} alt="weed qc logo" />
            {/* <span className='weedQc'>WEED QC</span> */}
            <div className='ctnLink'>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className='navigationLink'>Home</span>
                </NavLink>
                <div>
                    <NavLink to='/reservation' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                        <span className='navigationLink reservationLink'>Reservation</span>                
                    </NavLink>
                    {/* <div className='pointSignal'></div> */}
                </div>
                <NavLink to='/warband' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className='navigationLink'>Warband</span>
                </NavLink>
                <NavLink to='/guide' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className='navigationLink'>Guide</span>
                </NavLink>
            </div>
            <span className='userNameNavigation'>Bienvenu {getProfilFromLogin[3]}</span>
            
        </div>
    )
}

export default Navigation;