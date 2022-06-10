import React from 'react';
import './navigation.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/logox512.png';


const Navigation = ({ getProfilFromLogin }) => {

    return(
        <div className='ctnNavigation'>
            <img className='weedQc' src={logo} alt="weed qc logo" />
            {/* <span className='weedQc'>WEED QC</span> */}
            <div className='ctnLink'>
                <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className='navigationLink'>Home</span>
                </NavLink>
                <NavLink to='/reservation' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    <span className='navigationLink'>Reservation</span>                
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