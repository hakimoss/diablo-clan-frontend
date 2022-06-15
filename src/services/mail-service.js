
export default class MailService {

    static sendEmail(emailToSend) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(emailToSend),
        };
        
        return fetch('https://diablo-clan-weedqc.herokuapp.com/api/sendemail', options)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err));
    }


}