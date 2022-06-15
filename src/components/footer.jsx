import React from 'react';
import './footer.css';
import logo from '../images/logox512.png';


const Footer = () => {

    return(
        <div className='ctnFooter'>
            <div className='ctnFormSendEmail'>
                <img className='weedQcLogoFooter' src={logo} alt="weed qc logo" />
                <h3 style={{ color:'white'}}>Pour tout commentaire ou signalment de bug veuillez remplire se formulaire afin de menvoyer un mail !</h3>
                <form className='formSendEmail' action="mailto:hakimos@live.ca" method="post" enctype="text/plain">
                    
                        <div><label htmlFor='FirstName' style={{ color: 'white'}}>FirstName:</label></div>
                        <input type="text" name="FirstName" id='FirstName' className='firstNameInputSendEmail'/> 
                
                        <div><label htmlFor='Email' style={{ color: 'white'}}>email:</label></div>
                        <input type="text" name="email" className='emailInputSendEmail' id='Email'/>

                        <div><label style={{ color: 'white'}}>message:</label></div>
                        <textarea name="message" className='messageInputSendEmail'/> 

                        <div><input type="submit" name="submit" className='btnSubmitSendEmail' value="Submit" /></div>
                </form>
            </div>
        </div>
    )
}

export default Footer;