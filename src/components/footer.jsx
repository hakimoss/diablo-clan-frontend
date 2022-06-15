import React from 'react';
import './footer.css';
import logo from '../images/logox512.png';
import MailService from '../services/mail-service';


const Footer = () => {

    const handleSendEmail = () => {

        const subject = document.querySelector(".subjectInputSendEmail").value
        const body = document.querySelector(".messageInputSendEmail").value
        console.log("subject", subject)
        console.log("body", body)


        const emailToSend = {
            toEmail: "hakimososos@gmail.com",
            subject: subject,
            body: body
        }

        MailService.sendEmail(emailToSend).then(data => {
            console.log(data)
        })


    }

    return(
        <div className='ctnFooter'>
            <div className='ctnFormSendEmail'>
                <img className='weedQcLogoFooter' src={logo} alt="weed qc logo" />
                <h3 style={{ color:'white'}}>Pour tout commentaire ou signalment de bug veuillez remplire se formulaire afin de menvoyer un mail !</h3>
                <form className='formSendEmail'>
                        <div><label htmlFor='Email' style={{ color: 'white'}}>Sujet:</label></div>
                        <input type="text" name="email" className='subjectInputSendEmail' id='Email'/>

                        <div><label style={{ color: 'white'}}>message:</label></div>
                        <textarea name="message" className='messageInputSendEmail'/> 

                        <div><button onClick={handleSendEmail}  className='btnSubmitSendEmail' >Sumbit</button></div>
                </form>
            </div>
        </div>
    )
}

export default Footer;